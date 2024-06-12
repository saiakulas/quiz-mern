import React from 'react';
import { Link } from 'react-router-dom';

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

const AllQuizzes = () => {
  const quizzes = [
    { field: 'Math', description: 'Test your mathematical skills and knowledge.' },
    { field: 'Science', description: 'Explore the world of science with these quizzes.' },
    { field: 'History', description: 'Challenge your knowledge of historical events.' },
    { field: 'Geography', description: 'See how well you know the world around you.' },
  ];

  return (
    <div className="home">
      <h1 className="text-3xl font-bold mb-4">Welcome to the Quiz App</h1>
      <div className="quiz-cards">
        {quizzes.map((quiz, index) => (
          <div key={index} className="quiz-card bg-white shadow-md rounded-lg p-6 mb-4">
            <h2 className="text-xl font-semibold mb-2">{capitalizeFirstLetter(quiz.field)} Quiz</h2>
            <p className="text-gray-600">{quiz.description}</p>
            <Link to={`/quiz/${capitalizeFirstLetter(quiz.field)}`}>
              <button className="start-button bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Start Quiz
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllQuizzes;
