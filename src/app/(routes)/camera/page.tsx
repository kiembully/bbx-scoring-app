'use client';
import MainLayout from '@/components/layouts/MainLayout';
import dynamic from 'next/dynamic';

const BeybladeRecorderClient = dynamic(
  () => import('@/components/Recorder/BeybladeRecorderClient'),
  {
    ssr: false,
  }
);

const BeybladeRecorder = () => {
  return (
    <div className="flex items-center justify-center w-full">
      <MainLayout>
        <BeybladeRecorderClient />
      </MainLayout>
    </div>
  );
};

export default BeybladeRecorder;
