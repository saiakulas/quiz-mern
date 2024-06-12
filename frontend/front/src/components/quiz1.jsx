import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function Quiz() {
  const { field } = useParams();
  const [quizzes, setQuizzes] = useState([]);
  const [score, setScore] = useState(0);
  const [currentQuiz, setCurrentQuiz] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isWrong, setIsWrong] = useState(false); // State to track if the answer is wrong

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/quiz?field=${field}`);
        setQuizzes(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching quiz data');
        setLoading(false);
      }
    };
    fetchQuizzes();
  }, [field]);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleSubmit = () => {
    if (quizzes[currentQuiz].answer === selectedOption) {
      setScore(score + 1);
    } else {
      setIsWrong(true); // Set isWrong state to true if the answer is wrong
    }
    setCurrentQuiz(currentQuiz + 1);
    setSelectedOption('');
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>;
  }

  if (quizzes.length === 0) {
    return <div className="flex justify-center items-center h-screen">No quizzes available for {field}</div>;
  }

  if (currentQuiz >= quizzes.length) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <h1 className="text-3xl font-bold mb-4">{field.charAt(0).toUpperCase() + field.slice(1)} Quiz</h1>
        <div className="bg-green-200 p-4 rounded-md mb-4">Your score: {score}</div>
        {isWrong && <div className="bg-red-200 p-4 rounded-md mb-4">Oops! That was the wrong answer.</div>}
        <div className="bg-white shadow-md rounded-md p-6 max-w-lg">
          <h2 className="text-xl font-semibold mb-4">Congratulations! You've completed the quiz.</h2>
          <p>You can restart the quiz or go back to all quizzes.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="Quiz flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-4">{field.charAt(0).toUpperCase() + field.slice(1)} Quiz</h1>
      <div className="bg-white shadow-md rounded-md p-6 max-w-lg">
        <h2 className="text-xl font-semibold mb-4">{quizzes[currentQuiz].question}</h2>
        <div className="mb-4">
          {quizzes[currentQuiz].options.map((option, index) => (
            <div key={index} className="mb-2">
              <input
                type="radio"
                name="option"
                value={option}
                checked={selectedOption === option}
                onChange={handleOptionChange}
                className="mr-2"
              />
              {option}
            </div>
          ))}
        </div>
        <button
          onClick={handleSubmit}
          disabled={!selectedOption}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Submit
        </button>
      </div>
      <div className="bg-green-200 p-4 rounded-md mt-4">Score: {score}</div>
    </div>
  );
}

export default Quiz;
