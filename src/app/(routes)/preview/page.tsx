'use client';
import MainLayout from '@/components/layouts/MainLayout';
import { useEffect, useRef, useState } from 'react';

const VideoPlayer = () => {
  const [savedVideos, setSavedVideos] = useState<{ url: string; name: string }[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [playbackRate, setPlaybackRate] = useState(1);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  useEffect(() => {
    const stored = localStorage.getItem('savedVideos');
    if (stored) {
      setSavedVideos(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = playbackRate;
    }
  }, [playbackRate, selectedVideo]);

  return (
    <div className="flex items-center justify-center w-full">
      <MainLayout>
        {savedVideos.length > 0 && (
          <div className="p-4 bg-neutral-900 text-white">
            <h2 className="text-lg font-bold mb-2">Saved Match Videos</h2>
            <div className="flex gap-4 flex-wrap mb-4">
              {savedVideos.map((video, index) => (
                <button
                  key={index}
                  className="bg-neutral-700 hover:bg-neutral-600 px-3 py-1 rounded"
                  onClick={() => setSelectedVideo(video.url)}
                >
                  {video.name}
                </button>
              ))}
            </div>

            {selectedVideo && (
              <div className="flex flex-col items-center gap-4">
                <video
                  ref={videoRef}
                  src={selectedVideo}
                  controls
                  className="w-full max-w-3xl rounded"
                />
                <div className="flex gap-4 items-center">
                  <label>Playback Speed:</label>
                  <select
                    value={playbackRate}
                    onChange={(e) => setPlaybackRate(Number(e.target.value))}
                    className="bg-neutral-700 text-white px-2 py-1 rounded"
                  >
                    <option value={0.25}>0.25x</option>
                    <option value={0.5}>0.5x</option>
                    <option value={0.75}>0.75x</option>
                    <option value={1}>1x</option>
                    <option value={1.5}>1.5x</option>
                    <option value={2}>2x</option>
                  </select>
                </div>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.01}
                  onChange={(e) => {
                    const videoEl = document.querySelector(
                      'video[src="' + selectedVideo + '"]'
                    ) as HTMLVideoElement;
                    if (videoEl)
                      videoEl.currentTime = videoEl.duration * parseFloat(e.target.value);
                  }}
                  className="w-full max-w-3xl"
                />
              </div>
            )}
          </div>
        )}
      </MainLayout>
    </div>
  );
};

export default VideoPlayer;
