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

export default ScoreButtons;
