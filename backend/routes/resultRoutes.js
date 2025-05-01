import express from 'express';
import {
  submitQuiz,
  getUserResults,
  getQuizResults
} from '../controllers/resultController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Protect all routes after this middleware
router.use(protect);

router.post('/:quizId/submit', submitQuiz);
router.get('/user/:userId', getUserResults);
router.get('/quiz/:quizId', getQuizResults);

export default router;