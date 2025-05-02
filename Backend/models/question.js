// models/question.js
import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
  company: { type: String, required: true },
  questionType: {
    type: String,
    enum: ['Technical', 'Aptitude', 'HR', 'General', 'Behavioral', 'System Design'], // updated
    required: false
  }, 
  difficulty: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard'],
    required: true
  },
  question: { type: String, required: true },
  answer: { type: String, required: true },
  submissionId: { type: String, required: false }
});

export default mongoose.model('Question', questionSchema);
