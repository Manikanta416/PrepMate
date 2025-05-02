import Question from '../models/question.js';

// Create a new question (supports single or multiple)
export const createQuestion = async (req, res) => {
  try {
    const { company, questionType, difficulty, questions } = req.body;
    
    // Validate required fields
    if (!company || !questionType || !difficulty || !questions) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    
    let questionDocs = [];
    
    // Handle array of questions
    if (Array.isArray(questions)) {
      if (questions.length === 0) {
        return res.status(400).json({ error: 'Questions array must have at least one item' });
      }
      
      questionDocs = questions.map(q => {
        if (!q.question || !q.answer) {
          throw new Error('Each question in the array must have a question and answer');
        }
        return {
          company,
          questionType,
          difficulty,
          question: q.question,
          answer: q.answer,
        };
      });
    } 
    // Handle single question object
    else if (typeof questions === 'object' && questions.question && questions.answer) {
      questionDocs.push({
        company,
        questionType,
        difficulty,
        question: questions.question,
        answer: questions.answer,
      });
    } 
    // Handle direct question/answer in the request body for backward compatibility
    else if (req.body.question && req.body.answer) {
      questionDocs.push({
        company,
        questionType,
        difficulty,
        question: req.body.question,
        answer: req.body.answer,
      });
    }
    else {
      return res.status(400).json({ error: 'Invalid questions format' });
    }
    
    const savedQuestions = await Question.insertMany(questionDocs);
    res.status(201).json(savedQuestions);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error: ' + err.message });
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