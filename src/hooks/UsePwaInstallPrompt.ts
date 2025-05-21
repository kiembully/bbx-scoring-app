'use client';
import { useEffect, useState } from 'react';

// Define the BeforeInstallPromptEvent type outside the hook for reuse
type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
};

export function usePWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isPromptVisible, setIsPromptVisible] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Detect if app is already installed (standalone mode)
    // Extend Navigator type to include 'standalone' for iOS Safari
    interface NavigatorStandalone extends Navigator {
      standalone?: boolean;
    }
    const isStandalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      // for iOS Safari
      (window.navigator as NavigatorStandalone).standalone === true;

    if (isStandalone) {
      setIsInstalled(true);
      return; // Don't register listener if app is installed
    }

    function handler(e: Event) {
      const evt = e as BeforeInstallPromptEvent;
      evt.preventDefault(); // Prevent automatic prompt
      setDeferredPrompt(evt); // Save the event for later use
      setIsPromptVisible(true); // Show your custom install dialog
    }

    window.addEventListener('beforeinstallprompt', handler);

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  function promptToInstall() {
    if (!deferredPrompt) return;
    deferredPrompt.prompt(); // Show the browser's install prompt
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
      }
      setDeferredPrompt(null);
      setIsPromptVisible(false);
    });
  }

  return { isPromptVisible, promptToInstall, isInstalled };
}
