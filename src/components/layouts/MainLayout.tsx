'use client';
import React from 'react';
import InstallPromptDialog from '../InstallAppDialog';
import PWARegister from '@/hooks/PWARegister';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <main className="w-full">
      {children}
      <PWARegister />
      <InstallPromptDialog />
    </main>
  );
};

export default MainLayout;
