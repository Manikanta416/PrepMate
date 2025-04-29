import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Purpose from './pages/Purpose';
import Home from './pages/Home';
import AddQuestion from './pages/AddQuestion';
import QuestionDetails from './pages/QuestionDetails';
import './App.css';

/*************  ✨ Windsurf Command ⭐  *************/
/**
 * The App component sets up the main routing structure for the PrepMate application.
 * It includes a fixed header with the application title and a portfolio button.

/*******  2257e62e-3804-4ac8-8eec-d23aaf660688  *******/
function App() {
  return (
    <Router>
      <div className="App">
        {/* PrepMate Title */}
        <header className="app-header">
          <h1>PrepMate</h1>
          <div className="portfolio-button-container">
            <a href="/portfolio" className="portfolio-button">
              <span className="portfolio-icon">💼</span>
              <span className="portfolio-text">Portfolio</span>
            </a>
          </div>
        </header>

        {/* Main Routes */}
        <main className="app-main">
          <Routes>
            <Route path="/" element={<Purpose />} />
            <Route path="/home" element={<Home />} />
            <Route path="/add" element={<AddQuestion />} />
            <Route path="/question/:id" element={<QuestionDetails />} />
            <Route path="/group/:id" element={<QuestionDetails />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
