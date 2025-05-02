import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/Card.css";
import { postQuestion } from "../api";
import { v4 as uuidv4 } from 'uuid';

function AddQuestion() {
  const [company, setCompany] = useState("");
  const [questionType, setQuestionType] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [questions, setQuestions] = useState([{ question: "", answer: "", errors: {} }]);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const validateFields = () => {
    let isValid = true;
    let updatedQuestions = [...questions];

    if (!company || !questionType || !difficulty) {
      setMessage("Please fill in all category fields");
      isValid = false;
    }

    updatedQuestions = updatedQuestions.map(q => {
      const errors = {};
      if (!q.question.trim()) {
        errors.question = "Question is required";
        isValid = false;
      }
      if (!q.answer.trim()) {
        errors.answer = "Answer is required";
        isValid = false;
      }
      return { ...q, errors };
    });

    setQuestions(updatedQuestions);
    return isValid;
  };

  const handleAddQuestion = () => {
    setQuestions([...questions, { question: "", answer: "", errors: {} }]);
  };

  const handleRemoveQuestion = (index) => {
    if (questions.length > 1) {
      const updatedQuestions = [...questions];
      updatedQuestions.splice(index, 1);
      setQuestions(updatedQuestions);
    }
  };

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index][field] = value;
    if (updatedQuestions[index].errors && updatedQuestions[index].errors[field]) {
      updatedQuestions[index].errors[field] = "";
    }
    setQuestions(updatedQuestions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateFields()) return;

    try {
      setIsSubmitting(true);
      
      // Format the data according to the backend's expected structure
      const questionData = {
        company,
        questionType,
        difficulty,
        questions: questions.map(q => ({
          question: q.question,
          answer: q.answer
        }))
      };

      // Send a single request with all questions instead of multiple requests
      await postQuestion(questionData);
      
      setMessage("Hurray! Questions added successfully!");

      // Navigate to home after submission
      setTimeout(() => {
        navigate('/home');
      }, 1500);
    } catch (err) {
      console.error("Error adding questions", err);
      setMessage("Failed to submit questions. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="card-container">
      <div className="card">
        {/* Back button */}
        <Link to="/home" className="question-details__back-btn">← Back to Home</Link>

        <h2>Add New Preparation</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Company:</label>
            <input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="Enter company name"
            />
          </div>

         <div className="form-group">
           <label>Question Type:</label>
           <select 
             value={questionType} 
             onChange={(e) => setQuestionType(e.target.value)}
           >
             <option value="">Select Type</option>
             <option value="Technical">Technical</option>
             <option value="Aptitude">Aptitude</option>
             <option value="HR">HR</option>
             <option value="General">General</option>
             <option value="Behavioral">Behavioral</option>
             <option value="System Design">System Design</option>
           </select>
         </div>

          <div className="form-group">
            <label>Difficulty Level:</label>
            <select 
              value={difficulty} 
              onChange={(e) => setDifficulty(e.target.value)}
            >
              <option value="">Select Difficulty</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>

          <h3>Questions and Answers</h3>

          {questions.map((q, index) => (
            <div key={index} className="question-container">
              <h4>Question {index + 1}</h4>

              <div className="form-group">
                <label>Question:</label>
                <textarea
                  value={q.question}
                  onChange={(e) => handleQuestionChange(index, 'question', e.target.value)}
                  placeholder="Enter your question"
                  className={q.errors.question ? "error" : ""}
                />
                {q.errors.question && <div className="error-message">{q.errors.question}</div>}
              </div>

              <div className="form-group">
                <label>Answer:</label>
                <textarea
                  value={q.answer}
                  onChange={(e) => handleQuestionChange(index, 'answer', e.target.value)}
                  placeholder="Enter the answer"
                  className={q.errors.answer ? "error" : ""}
                />
                {q.errors.answer && <div className="error-message">{q.errors.answer}</div>}
              </div>

              {questions.length > 1 && (
                <button 
                  type="button" 
                  className="remove-btn"
                  onClick={() => handleRemoveQuestion(index)}
                >
                  Remove Question
                </button>
              )}
            </div>
          ))}

          <div className="button-group">
            <button type="button" onClick={handleAddQuestion} className="add-btn">
              Add Another Question
            </button>
            
            {/* Display message above the submit button */}
            {message && <div className={message.includes("Hurray") ? "success-message" : "error-message"}>{message}</div>}
            
            <button type="submit" className="submit-btn" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit All Questions"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddQuestion;