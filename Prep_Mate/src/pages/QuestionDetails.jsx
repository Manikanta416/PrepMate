import React, { useEffect, useState } from "react";
import { fetchQuestions, fetchQuestionDetails } from "../api";
import { useParams, Link } from "react-router-dom";
import "../styles/question.css";

function QuestionDetails() {
  const { id } = useParams();
  const [questions, setQuestions] = useState([]);
  const [groupInfo, setGroupInfo] = useState({
    company: "",
    questionType: "",
    difficulty: ""
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isGroup, setIsGroup] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const isGroupRoute = window.location.pathname.includes('/group/');
        setIsGroup(isGroupRoute);

        if (isGroupRoute) {
          const res = await fetchQuestions();

          if (res && Array.isArray(res.data)) {
            const decodedId = decodeURIComponent(id);
            const [company, questionType, difficulty] = decodedId.split('-');

            const matchingQuestions = res.data.filter(q =>
              (q.company || "Unknown") === company &&
              (q.questionType || "General") === questionType &&
              (q.difficulty || "Medium") === difficulty
            );

            if (matchingQuestions.length > 0) {
              setQuestions(matchingQuestions);
              setGroupInfo({ company, questionType, difficulty });
            } else {
              setError("No questions found for this group.");
            }
          } else {
            setError("No data received from the server.");
          }
        } else {
          const res = await fetchQuestionDetails(id);
          if (res && res.data) {
            setQuestions([res.data]);
            setGroupInfo({
              company: res.data.company || "Unknown",
              questionType: res.data.questionType || "General",
              difficulty: res.data.difficulty || "Medium"
            });
          } else {
            setError("Question not found.");
          }
        }

        setLoading(false);
      } catch (err) {
        console.error("Error in QuestionDetails:", err);
        setError("Something went wrong. Please try again.");
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return <div className="status-message status-message--loading">Loading...</div>;
  }

  if (error) {
    return <div className="status-message status-message--error">{error}</div>;
  }

  if (questions.length === 0) {
    return <div className="status-message status-message--error">No questions found.</div>;
  }

  // Single Question Display
  if (!isGroup && questions.length === 1) {
    const question = questions[0];
    return (
      <div className="question-details">
        <Link to="/" className="question-details__back-btn">← Back to Home</Link>
        <h1 className="question-details__title">{question.company}</h1>
        <div className="question-details__meta">
          <p><strong>Category:</strong> {question.questionType}</p>
          <p><strong>Difficulty:</strong> {question.difficulty}</p>
        </div>
        <div className="answer-box">
          <h3 className="answer-box__heading">Question:</h3>
          <p className="answer-box__text">{question.question}</p>
          <h3 className="answer-box__heading">Answer:</h3>
          <p className="answer-box__text">{question.answer}</p>
        </div>
      </div>
    );
  }

  // Group of Questions Display
  return (
    <div className="question-details question-group">
      <Link to="/home" className="question-details__back-btn">← Back to Home</Link>
      <h1 className="question-details__title">{groupInfo.company}</h1>
      <div className="question-details__meta">
        <p><strong>Category:</strong> {groupInfo.questionType}</p>
        <p><strong>Difficulty:</strong> {groupInfo.difficulty}</p>
        <p><strong>Total Questions:</strong> {questions.length}</p>
      </div>

      <div className="question-group__list">
        {questions.map((question, index) => (
          <div key={question._id || index} className="question-group__item">
            <h3 className="question-group__number">Question {index + 1}</h3>
            <div className="answer-box">
              <h4 className="answer-box__subheading">Question:</h4>
              <p className="answer-box__text">{question.question}</p>
              <h4 className="answer-box__subheading">Answer:</h4>
              <p className="answer-box__text">{question.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default QuestionDetails;
