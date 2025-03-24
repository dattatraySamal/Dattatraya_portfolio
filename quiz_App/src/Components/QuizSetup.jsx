import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const QuizSetup = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("easy");
  const [numQuestions, setNumQuestions] = useState(10);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://opentdb.com/api_category.php")
      .then((res) => setCategories(res.data.trivia_categories))
      .catch(() => alert("Failed to load categories"));
  }, []);

  const startQuiz = () => {
    if (!name || !category) return alert("Please fill all fields!");
    localStorage.setItem("username", name);
    navigate(
      `/quiz?category=${category}&difficulty=${difficulty}&amount=${numQuestions}`
    );
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700">
      <div className="bg-white/10 backdrop-blur-md p-8 rounded-lg shadow-lg w-full max-w-md border border-white/20">
        <h1 className="text-3xl font-bold text-white text-center mb-6">
          Setup Your Quiz
        </h1>

        <div className="mb-4">
          <label className="block text-white mb-1">Your Name</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 text-black"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-white mb-1">Category</label>
          <select
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 text-black"
            onChange={(e) => setCategory(e.target.value)}
            value={category}
          >
            <option value="">Select Category</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-white mb-1">Difficulty</label>
          <select
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 text-black"
            onChange={(e) => setDifficulty(e.target.value)}
            value={difficulty}
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-white mb-1">Number of Questions</label>
          <input
            type="number"
            min="1"
            max="50"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 text-black"
            value={numQuestions}
            onChange={(e) => setNumQuestions(Number(e.target.value))}
          />
        </div>

        <button
          className="w-full bg-indigo-500 hover:bg-indigo-600 transition-colors duration-200 text-white py-2 rounded-md font-semibold shadow-md"
          onClick={startQuiz}
        >
          Start Quiz
        </button>
      </div>
    </div>
  );
};

export default QuizSetup;
