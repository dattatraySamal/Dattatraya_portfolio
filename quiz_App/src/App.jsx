import { Route, Routes } from "react-router-dom";
import "./App.css";
import QuizSetup from "./Components/QuizSetup";
import Quiz from "./Components/Quiz";
import Leaderboard from "./Components/Leaderboard";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<QuizSetup />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Routes>
    </>
  );
}

export default App;
