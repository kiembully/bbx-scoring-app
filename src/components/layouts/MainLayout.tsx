"use client"
import React from 'react'
import InstallPromptDialog from '../InstallAppDialog';

interface MainLayoutProps {
  children: React.ReactNode
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <main className='w-full'>
      {children}
      <InstallPromptDialog />
    </main>
  );
}

export default MainLayout;