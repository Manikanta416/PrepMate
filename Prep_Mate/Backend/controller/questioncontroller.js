// controller/questioncontroller.js
import Question from '../models/question.js';

// Create a new question
export const createQuestion = async (req, res) => {
  try {
    const { company, questionType, difficulty, questions } = req.body;

    if (!company || !questionType || !difficulty || !Array.isArray(questions) || questions.length === 0) {
      return res.status(400).json({ error: 'All fields are required including an array of questions' });
    }

    const questionDocs = questions.map(q => ({
      company,
      questionType,
      difficulty,
      question: q.question,
      answer: q.answer,
    }));

    const savedQuestions = await Question.insertMany(questionDocs);
    res.status(201).json(savedQuestions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};



// Get all questions
export const getQuestions = async (req, res) => {
  try {
    const questions = await Question.find();
    res.status(200).json(questions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get a specific question by its ID
export const getQuestionById = async (req, res) => {
  const { id } = req.params;  // Get the ID from the URL params
  try {
    const question = await Question.findById(id);
    if (!question) {
      return res.status(404).json({ error: 'Question not found' });
    }
    res.status(200).json(question);  // Send the question details
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};