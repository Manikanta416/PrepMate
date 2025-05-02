// routes/questions.js
import { getQuestions, createQuestion, getQuestionById } from '../controller/questioncontroller.js';
import express from 'express';

const router = express.Router();

router.get('/', getQuestions);
router.post('/', createQuestion);
router.get('/:id', getQuestionById);

export default router;