'use client';

import { useEffect, useRef, useState } from 'react';
import ScoreButtons from '@/components/Buttons/ScoreButtons';
import Image from 'next/image';

type Team = 'red' | 'blue';

const BeybladeRecorderClient = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordedChunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);

  const [recording, setRecording] = useState(false);
  const [paused, setPaused] = useState(false);

  const [redScore, setRedScore] = useState(0);
  const [blueScore, setBlueScore] = useState(0);
  const [scoreHistory, setScoreHistory] = useState<{ team: Team; points: number }[]>([]);

  const maxScore = 100;

  useEffect(() => {
    const startPreview = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { width: 1920, height: 1080, frameRate: 30, facingMode: 'environment' },
          audio: true,
        });
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error('Failed to access camera', err);
      }
    };

    startPreview();

    // Cleanup
    return () => {
      streamRef.current?.getTracks().forEach((track) => track.stop());
    };
  }, []);

  const startRecording = () => {
    const stream = streamRef.current;
    if (!stream) return;

    recordedChunksRef.current = [];

    const recorder = new MediaRecorder(stream);
    recorder.ondataavailable = (e) => {
      if (e.data.size > 0) {
        recordedChunksRef.current.push(e.data);
      }
    };

    mediaRecorderRef.current = recorder;
    recorder.start();
    setRecording(true);
    setPaused(false);
  };

  const stopRecording = () => {
    const recorder = mediaRecorderRef.current;
    if (!recorder) return;

    recorder.onstop = () => {
      const blob = new Blob(recordedChunksRef.current, { type: 'video/webm' });
      const url = URL.createObjectURL(blob);

      const existingVideos = JSON.parse(localStorage.getItem('savedVideos') || '[]');
      const updatedVideos = [...existingVideos, { url, name: `beyblade-match-${Date.now()}.webm` }];
      localStorage.setItem('savedVideos', JSON.stringify(updatedVideos));

      // Auto-download the video
      const a = document.createElement('a');
      a.href = url;
      a.download = `beyblade-match-${Date.now()}.webm`;
      a.style.display = 'none';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      // Optional: Clear recorded chunks
      recordedChunksRef.current = [];
    };

    recorder.stop();
    setRecording(false);
    setPaused(false);
  };

  const pauseRecording = () => {
    mediaRecorderRef.current?.pause();
    setPaused(true);
  };

  const resumeRecording = () => {
    mediaRecorderRef.current?.resume();
    setPaused(false);
  };

  const handleScore = (team: Team, points: number) => {
    if (team === 'red') {
      setRedScore((prev) => Math.min(prev + points, maxScore));
    } else {
      setBlueScore((prev) => Math.min(prev + points, maxScore));
    }
    setScoreHistory((prev) => [...prev, { team, points }]);
  };

  const undoLast = () => {
    const last = scoreHistory.pop();
    if (!last) return;
    if (last.team === 'red') {
      setRedScore((prev) => Math.max(prev - last.points, 0));
    } else {
      setBlueScore((prev) => Math.max(prev - last.points, 0));
    }
    setScoreHistory([...scoreHistory]);
  };

  const clearAll = () => {
    setRedScore(0);
    setBlueScore(0);
    setScoreHistory([]);
  };

  useEffect(() => {
    const red = parseInt(localStorage.getItem('redScore') || '0', 10);
    const blue = parseInt(localStorage.getItem('blueScore') || '0', 10);
    const history = localStorage.getItem('scoreHistory');
    setRedScore(red);
    setBlueScore(blue);
    setScoreHistory(history ? JSON.parse(history) : []);
  }, []);

  useEffect(() => {
    localStorage.setItem('redScore', redScore.toString());
    localStorage.setItem('blueScore', blueScore.toString());
    localStorage.setItem('scoreHistory', JSON.stringify(scoreHistory));
  }, [redScore, blueScore, scoreHistory]);

  return (
    <div className="flex flex-col min-h-screen w-full">
      <div
        className="flex flex-row w-full flex-auto relative"
        style={{ height: 'calc(100vh - 80px)' }}
      >
        <video ref={videoRef} autoPlay muted className="w-full h-full object-cover" />
        <div className="absolute left-2 bottom-0 text-[60px] leading-tight font-blackops text-red-500">
          {redScore}
        </div>
        <div className="absolute right-2 bottom-0 text-[60px] leading-tight font-blackops text-blue-500">
          {blueScore}
        </div>
      </div>
      <div className="flex w-full bg-neutral-600 max-h-[80px]">
        <ScoreButtons onScore={(points) => handleScore('red', points)} />
        <div className="flex flex-col">
          <div className="flex justify-between px-2 py-1 gap-x-2">
            {/* Start/Stop toggle */}
            {!recording ? (
              <button
                onClick={startRecording}
                className="bg-red-500 text-white rounded h-8 w-10 flex items-center justify-center"
              >
                <Image src="/icons/player-record.png" alt="Start" width={24} height={24} />
              </button>
            ) : (
              <button
                onClick={stopRecording}
                className="bg-neutral-800 text-white rounded h-8 w-10 flex items-center justify-center"
              >
                <Image src="/icons/stop.png" alt="Stop" width={24} height={24} />
              </button>
            )}

            {/* Pause/Resume toggle (only shown when recording) */}
            <button
              onClick={() => (paused ? resumeRecording() : pauseRecording())}
              className={`rounded h-8 w-10 flex items-center justify-center ${
                paused ? 'bg-green-500' : 'bg-yellow-500'
              }`}
              disabled={!recording}
            >
              {paused ? (
                <Image src="/icons/play.png" alt="Resume" width={24} height={24} />
              ) : (
                <Image src="/icons/pause.png" alt="Pause" width={24} height={24} />
              )}
            </button>
          </div>

          <div className="flex justify-between px-2 py-1 gap-x-2">
            <button
              onClick={undoLast}
              className="bg-yellow-500 text-white flex items-center justify-center rounded h-8 w-10"
            >
              <Image src="/icons/restore.png" alt="Undo" width={24} height={24} />
            </button>
            <button
              onClick={clearAll}
              className="bg-red-700 text-white flex items-center justify-center rounded h-8 w-10  "
            >
              <Image src="/icons/clear-all.png" alt="Undo" width={24} height={24} />
            </button>
          </div>
        </div>
        <ScoreButtons onScore={(points) => handleScore('blue', points)} />
      </div>
    </div>
  );
};

export default BeybladeRecorderClient;
