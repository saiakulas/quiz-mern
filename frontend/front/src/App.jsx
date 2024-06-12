import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Quiz from './components/quiz1';
import Home from './components/home';
import AllQuizzes from './components/alquiz';
import './index.css'
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/quiz/:field" element={<Quiz />} />
          <Route path="all" element={<AllQuizzes />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
