"use client"
import MainLayout from "@/components/layouts/MainLayout";
import { useState } from "react";

type Team = "red" | "blue";

const ScoreButtons = ({ onScore }: { onScore: (points: number) => void }) => (
  <div className="grid grid-cols-4 bg-neutral-500">
    <button onClick={() => onScore(1)} className="border p-6 w-full">SF</button>
    <button onClick={() => onScore(2)} className="border p-6 w-full">BF</button>
    <button onClick={() => onScore(3)} className="border p-6 w-full">XF</button>
    <button onClick={() => onScore(2)} className="border p-6 w-full">OF</button>
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
        <div className="flex flex-col items-center justify-center gap-2 py-2 fixed top-0 left-0 right-0">
          <div className="flex gap-4">
            <button onClick={undoLast} className="bg-yellow-500 text-white px-2 py-1 rounded">Undo Last</button>
            <button onClick={clearAll} className="bg-red-700 text-white px-2 py-1 rounded">Clear All</button>
          </div>
        </div>

        <div className="flex min-h-screen w-full">
          {/* Red team */}
          <div className="flex w-full flex-col min-h-screen bg-red-500">
            <div className="h-full w-full flex items-center justify-center text-8xl text-white">{redScore}</div>
            <ScoreButtons onScore={(points) => handleScore("red", points)} />
          </div>

          {/* Blue team */}
          <div className="flex w-full flex-col min-h-screen bg-blue-500">
            <div className="h-full w-full flex items-center justify-center text-8xl text-white">{blueScore}</div>
            <ScoreButtons onScore={(points) => handleScore("blue", points)} />
          </div>
        </div>
      </MainLayout>
    </div>
  );
};

export default Home;
