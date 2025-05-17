import { usePWAInstallPrompt } from "@/hooks/UsePwaInstallPrompt";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function InstallPromptDialog() {
  const { isPromptVisible, promptToInstall } = usePWAInstallPrompt();
  const [hasPrompted, setHasPrompted] = useState(false); // prevent multiple dialogs

  useEffect(() => {
    if (isPromptVisible && !hasPrompted) {
      setHasPrompted(true); // mark that we showed the dialog

      Swal.fire({
        title: "Install this app for a better experience!",
        icon: "info",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Install",
      }).then((result) => {
        if (result.isConfirmed) {
          promptToInstall();
        }
      });
    }
  }, [isPromptVisible, promptToInstall, hasPrompted]);

  return null;
}
