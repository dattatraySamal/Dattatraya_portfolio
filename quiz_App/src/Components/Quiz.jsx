import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  
  const params = new URLSearchParams(location.search);
  const category = params.get("category");
  const difficulty = params.get("difficulty");
  const numQuestions = params.get("amount");

  useEffect(() => {
    axios.get(`https://opentdb.com/api.php?amount=${numQuestions}&category=${category}&difficulty=${difficulty}&type=multiple`)
      .then((res) => setQuestions(res.data.results))
      .catch(() => alert("Failed to fetch questions"));
  }, [category, difficulty, numQuestions]);

  const handleAnswer = (selectedAnswer) => {
    if (selectedAnswer === questions[currentIndex].correct_answer) {
      setScore(score + 1);
    }
    setCurrentIndex(currentIndex + 1);
  };

  const finishQuiz = () => {
    const leaderboard = JSON.parse(localStorage.getItem("leaderboard") || "[]");
    leaderboard.push({ name: localStorage.getItem("username"), score });
    localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
    navigate("/leaderboard");
  };

  if (!questions.length) return <h1 className="text-white">Loading...</h1>;

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <h2 className="text-xl">{`Question ${currentIndex + 1}/${numQuestions}`}</h2>
      <p className="mb-4">{questions[currentIndex].question}</p>
      {questions[currentIndex].incorrect_answers
        .concat(questions[currentIndex].correct_answer)
        .sort(() => Math.random() - 0.5)
        .map((answer, idx) => (
          <button key={idx} onClick={() => handleAnswer(answer)}
            className="bg-gray-800 px-4 py-2 my-2 rounded-md w-64">
            {answer}
          </button>
        ))}
      {currentIndex === questions.length - 1 ? (
        <button onClick={finishQuiz} className="bg-green-500 px-4 py-2 mt-4 rounded text-white">
          Submit Quiz
        </button>
      ) : null}
    </div>
  );
};

export default Quiz;
