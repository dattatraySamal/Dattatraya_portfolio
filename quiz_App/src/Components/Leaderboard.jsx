const Leaderboard = () => {
  const leaderboard = JSON.parse(localStorage.getItem("leaderboard") || "[]")
    .sort((a, b) => b.score - a.score);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <h1 className="text-2xl font-bold mb-4">Leaderboard</h1>
      {leaderboard.map((entry, idx) => (
        <p key={idx} className="bg-gray-800 px-4 py-2 rounded my-2">{entry.name} - {entry.score}</p>
      ))}
    </div>
  );
};

export default Leaderboard;
