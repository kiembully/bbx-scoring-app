'use client';
import MainLayout from '@/components/layouts/MainLayout';
import { useEffect, useRef, useState } from 'react';

const ScoreButtons = ({ onScore }: { onScore: (points: number) => void }) => (
  <div className="grid grid-cols-4 gap-2 p-2 font-blackops text-xl text-white w-full">
    {['SF', 'BF', 'XF', 'OF'].map((label, i) => (
      <button
        key={label}
        onClick={() => onScore(i === 0 ? 1 : i === 3 ? 2 : i + 1)}
        className="w-full h-18 border rounded-lg p-2 box-shadow-lg bg-zinc-500 transition-all duration-100 active:bg-blue-600 active:shadow-inner active:ring-inset active:ring-blue-800"
      >
        {label}
      </button>
    ))}
  </div>
);

type Team = 'red' | 'blue';

const BeybladeRecorder = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const startCamera = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: {
        width: { ideal: 1920 },
        height: { ideal: 1080 },
        facingMode: 'environment', // back camera on phones
      },
      audio: true,
    });
    if (videoRef.current) videoRef.current.srcObject = stream;
  };

  const [redScore, setRedScore] = useState(0);
  const [blueScore, setBlueScore] = useState(0);
  const [scoreHistory, setScoreHistory] = useState<{ team: Team; points: number }[]>([]);
  const [isPaused, setIsPaused] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const recordedChunksRef = useRef<Blob[]>([]); // <--- useRef ensures stable reference

  const togglePlayPause = () => {
    const stream = videoRef.current?.srcObject as MediaStream;
    if (!stream) return;

    if (!mediaRecorder) {
      const recorder = new MediaRecorder(stream, {
        mimeType: 'video/webm;codecs=vp9', // or just 'video/webm'
      });

      recordedChunksRef.current = [];

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          recordedChunksRef.current.push(event.data);
        }
      };

      recorder.onstop = () => {
        const blob = new Blob(recordedChunksRef.current, { type: 'video/webm' });
        if (blob.size > 0) {
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `beyblade-match-${Date.now()}.webm`;
          a.click();
          URL.revokeObjectURL(url);
        } else {
          alert('No data was recorded.');
        }

        setMediaRecorder(null);
        recordedChunksRef.current = [];
      };

      recorder.start();
      setMediaRecorder(recorder);
      setIsRecording(true);
      setIsPaused(false);
    } else if (mediaRecorder.state === 'recording') {
      mediaRecorder.pause();
      setIsPaused(true);
    } else if (mediaRecorder.state === 'paused') {
      mediaRecorder.resume();
      setIsPaused(false);
    }
  };

  const stopCamera = () => {
    const stream = videoRef.current?.srcObject as MediaStream;
    stream?.getTracks().forEach((track) => track.stop());

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }

    if (mediaRecorder && mediaRecorder.state !== 'inactive') {
      mediaRecorder.stop(); // this triggers the onstop above
    }

    setIsPaused(false);
    setIsRecording(false);
    startCamera();
  };

  const maxScore = 100;

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
    startCamera();
  }, []);

  // Load from localStorage on initial mount
  useEffect(() => {
    const red = parseInt(localStorage.getItem('redScore') || '0', 10);
    const blue = parseInt(localStorage.getItem('blueScore') || '0', 10);
    const history = localStorage.getItem('scoreHistory');

    setRedScore(red);
    setBlueScore(blue);
    setScoreHistory(history ? JSON.parse(history) : []);
  }, []);

  // Save to localStorage on changes
  useEffect(() => {
    localStorage.setItem('redScore', redScore.toString());
    localStorage.setItem('blueScore', blueScore.toString());
    localStorage.setItem('scoreHistory', JSON.stringify(scoreHistory));
  }, [redScore, blueScore, scoreHistory]);

  return (
    <div className="flex items-center justify-center w-full">
      <MainLayout>
        <div className="flex flex-col min-h-screen w-full">
          <div
            className="flex flex-row w-full flex-auto relative"
            style={{
              height: 'calc(100vh - 88px)',
            }}
          >
            <video ref={videoRef} autoPlay muted className="w-full h-full object-cover" />
            <div className="absolute left-2 bottom-0 text-[60px] leading-tight font-blackops text-red-500">
              {redScore}
            </div>
            <div className="absolute right-2 bottom-0 text-[60px] leading-tight font-blackops text-blue-500">
              {blueScore}
            </div>
          </div>
          <div className="flex w-full bg-neutral-600">
            <ScoreButtons onScore={(points) => handleScore('red', points)} />
            <div className="flex flex-col justify-between p-2 gap-y-2">
              <button
                onClick={undoLast}
                className="bg-yellow-500 text-white px-2 py-1 rounded w-20"
              >
                Undo
              </button>
              <button onClick={clearAll} className="bg-red-700 text-white px-2 py-1 rounded w-20">
                Clear
              </button>
            </div>
            <div className="flex flex-col justify-between p-2 gap-y-2">
              <button
                onClick={togglePlayPause}
                className="px-2 py-1 rounded text-white font-semibold transition-colors duration-150"
                style={{ backgroundColor: isPaused ? '#22c55e' : '#eab308' }} // green or yellow
              >
                {isRecording && !isPaused ? 'Pause' : 'Play'}
              </button>
              <button
                onClick={stopCamera}
                className="bg-red-600 text-white px-2 py-1 rounded font-semibold"
              >
                Stop
              </button>
            </div>
            <ScoreButtons onScore={(points) => handleScore('blue', points)} />
          </div>
        </div>
      </MainLayout>
    </div>
  );
};

export default BeybladeRecorder;
