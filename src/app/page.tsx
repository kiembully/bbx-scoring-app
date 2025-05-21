'use client';
import MainLayout from '@/components/layouts/MainLayout';
import { useState, useEffect } from 'react';

type Team = 'red' | 'blue';

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

const Home = () => {
  const [redScore, setRedScore] = useState(0);
  const [blueScore, setBlueScore] = useState(0);
  const [scoreHistory, setScoreHistory] = useState<{ team: Team; points: number }[]>([]);

  const maxScore = 100;

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

  return (
    <div className="flex items-center justify-center w-full">
      <MainLayout>
        <div className="flex flex-col min-h-screen w-full">
          <div className="flex flex-row w-full flex-auto">
            {/* Red team */}
            <div className="flex w-full flex-col bg-red-500">
              <div className="h-full w-full flex items-center justify-center text-[120px] font-blackops text-white">
                {redScore}
              </div>
            </div>
            {/* Blue team */}
            <div className="flex w-full flex-col bg-blue-500">
              <div className="h-full w-full flex items-center justify-center text-[120px] font-blackops text-white">
                {blueScore}
              </div>
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
            <ScoreButtons onScore={(points) => handleScore('blue', points)} />
          </div>
        </div>
      </MainLayout>
    </div>
  );
};

export default Home;
