import React, { useEffect, useState } from "react";
import { fetchQuestions } from "../api";
import { Link } from "react-router-dom";
import "../styles/Home.css";

function Home() {
  const [questions, setQuestions] = useState([]);
  const [groupedQuestions, setGroupedQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('darkMode');
    return savedTheme ? JSON.parse(savedTheme) : false;
  });

  // Toggle dark mode function
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    // Save preference to localStorage
    localStorage.setItem('darkMode', JSON.stringify(!darkMode));
  };

  // Apply dark mode class to body when component mounts or when darkMode changes
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  useEffect(() => {
    const fetchAllQuestions = async () => {
      setIsLoading(true);
      try {
        const res = await fetchQuestions();
        console.log("Fetched questions:", res);

        if (res && Array.isArray(res.data)) {
          setQuestions(res.data);
          const grouped = groupQuestionsByProperties(res.data);
          setGroupedQuestions(grouped);
        } else {
          setQuestions([]);
          setGroupedQuestions([]);
        }
      } catch (err) {
        console.error("Error fetching questions:", err);
        setQuestions([]);
        setGroupedQuestions([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllQuestions();
  }, []);

  const groupQuestionsByProperties = (questions) => {
    const groups = {};

    questions.forEach((question) => {
      const company = question.company || "Unknown";
      const questionType = question.questionType || "General";
      const difficulty = question.difficulty || "Medium";
      const key = `${company}-${questionType}-${difficulty}`;

      if (!groups[key]) {
        groups[key] = {
          company,
          questionType,
          difficulty,
          questions: [question],
          _id: key,
        };
      } else {
        groups[key].questions.push(question);
      }
    });

    return Object.values(groups);
  };

  const getCardBgColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case "easy":
        return "card-easy";
      case "hard":
        return "card-hard";
      default:
        return "card-medium";
    }
  };

  const getQuestionTypeIcon = (type) => {
    switch (type.toLowerCase()) {
      case "technical":
        return "💻";
      case "aptitude":
        return "🧠";
      case "hr":
        return "👥";
      case "behavioral":
        return "🤝";
      case "system design":
        return "📐";
      default:
        return "📝";
    }
  };

  return (
    <div className={`home-page ${darkMode ? 'dark-mode' : ''}`}>
      {/* Global Navbar */}
      <div className="global-navbar">
        <div className="navbar-logo">
          <span className="logo-text">PrepMate</span>
          <span className="logo-tagline">Your Interview Preparation Companion</span>
        </div>
        <div className="navbar-links">
          <Link to="/home" className="nav-link active">Dashboard</Link>
          <Link to="/purpose" className="nav-link">About</Link>
          <Link to="/portfolio" className="nav-link">Portfolio</Link>
          <button onClick={toggleDarkMode} className="theme-toggle-btn">
            {darkMode ? '☀️ Light' : '🌙 Dark'}
          </button>
        </div>
      </div>

      <div className="header-container">
        <h1 className="home-title">PrepMate Dashboard</h1>
        <p className="home-subtitle">Your Interview Preparation Hub</p>
      </div>

      {isLoading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading your preparation data...</p>
        </div>
      ) : (
        <>
          <div className="home-stats">
            <div className="stat-item">
              <span className="stat-value">{questions.length}</span>
              <span className="stat-label">Total Questions</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">{groupedQuestions.length}</span>
              <span className="stat-label">Categories</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">
                {[...new Set(questions.map((q) => q.company))].length}
              </span>
              <span className="stat-label">Companies</span>
            </div>
          </div>

          {/* Add button placed above the cards */}
          <Link to="/add" className="home-add-link">
            <span className="add-icon">+</span>
            <span className="add-text">Add New Interview Preparation</span>
          </Link>

          <div className="home-cards-container">
            {groupedQuestions.length > 0 ? (
              groupedQuestions.map((group) => (
                <Link
                  to={`/group/${group._id}`}
                  key={group._id}
                  className={`home-card ${getCardBgColor(
                    group.difficulty
                  )} animate-card`}
                >
                  <div className="card-company">
                    <span className="company-icon">🏢</span>
                    <span className="company-name">{group.company}</span>
                  </div>
                  <div className="card-type">
                    {getQuestionTypeIcon(group.questionType)}{" "}
                    {group.questionType}
                  </div>
                  <div className="card-difficulty">
                    <span className="difficulty-badge">
                      {group.difficulty}
                    </span>
                  </div>
                  <div className="card-count">
                    <span className="count-number">
                      {group.questions.length}
                    </span>
                    <span className="count-label">Questions</span>
                  </div>
                </Link>
              ))
            ) : (
              <div className="empty-state">
                <div className="empty-icon">📚</div>
                <h3>No Questions Available</h3>
                <p>Start building your preparation library</p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Home;