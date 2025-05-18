"use client"
import MainLayout from "@/components/layouts/MainLayout";
import { useState } from "react";

type Team = "red" | "blue";

const ScoreButtons = ({ onScore }: { onScore: (points: number) => void }) => (
  <div className="grid grid-cols-4 gap-2 p-2 font-blackops text-xl text-white">
    <button onClick={() => onScore(1)} className="w-full h-20 border rounded-lg p-2 box-shadow-lg bg-zinc-500 transition-all duration-100 active:bg-blue-600 active:shadow-inner active:ring-inset active:ring-blue-800">SF</button>
    <button onClick={() => onScore(2)} className="w-full h-20 border rounded-lg p-2 box-shadow-lg bg-zinc-500 transition-all duration-100 active:bg-blue-600 active:shadow-inner active:ring-inset active:ring-blue-800">BF</button>
    <button onClick={() => onScore(3)} className="w-full h-20 border rounded-lg p-2 box-shadow-lg bg-zinc-500 transition-all duration-100 active:bg-blue-600 active:shadow-inner active:ring-inset active:ring-blue-800">XF</button>
    <button onClick={() => onScore(2)} className="w-full h-20 border rounded-lg p-2 box-shadow-lg bg-zinc-500 transition-all duration-100 active:bg-blue-600 active:shadow-inner active:ring-inset active:ring-blue-800">OF</button>
  </div>
);

const Home = () => {
  const [redScore, setRedScore] = useState(0);
  const [blueScore, setBlueScore] = useState(0);
  const [scoreHistory, setScoreHistory] = useState<{ team: Team; points: number }[]>([]);

  const maxScore = 100;

  const handleScore = (team: Team, points: number) => {
    if (team === "red") {
      setRedScore(prev => Math.min(prev + points, maxScore));
    } else {
      setBlueScore(prev => Math.min(prev + points, maxScore));
    }

    setScoreHistory(prev => [...prev, { team, points }]);
  };

  const undoLast = () => {
    const last = scoreHistory.pop();
    if (!last) return;

    if (last.team === "red") {
      setRedScore(prev => Math.max(prev - last.points, 0));
    } else {
      setBlueScore(prev => Math.max(prev - last.points, 0));
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
        <div className="flex flex-col items-center justify-center fixed left-0 right-0 bottom-[4px]">
          <div className="flex flex-col gap-y-2 justify-between p-2">
            <button onClick={undoLast} className="bg-yellow-500 text-white px-2 py-1 rounded w-20">Undo</button>
            <button onClick={clearAll} className="bg-red-700 text-white px-2 py-1 rounded w-20">Clear</button>
          </div>
        </div>

        <div className="flex min-h-screen w-full">
          {/* Red team */}
          <div className="flex w-full flex-col min-h-screen bg-red-500">
            <div className="h-full w-full flex items-center justify-center text-[120px] font-blackops text-white">{redScore}</div>
            <div className='pr-10 bg-neutral-600'>
              <ScoreButtons onScore={(points) => handleScore("red", points)} />
            </div>
          </div>
          {/* Blue team */}
          <div className="flex w-full flex-col min-h-screen bg-blue-500">
            <div className="h-full w-full flex items-center justify-center text-[120px] font-blackops text-white">{blueScore}</div>
            <div className='pl-10 bg-neutral-600'>
              <ScoreButtons onScore={(points) => handleScore("blue", points)} />
            </div>
          </div>
        </div>
      </MainLayout>
    </div>
  );
};

export default Home;
