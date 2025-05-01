import express from 'express';
import {
  createQuizWithQuestions,
  getAllQuizzes,
  getQuiz,
  updateQuiz,
  deleteQuiz
} from '../controllers/quizController.js';
import { protect, restrictTo } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.route('/')
  .post(protect, restrictTo('admin'), createQuizWithQuestions)
  .get(getAllQuizzes);

router.route('/:id')
  .get(getQuiz)
  .patch(protect, restrictTo('admin'), updateQuiz)
  .delete(protect, restrictTo('admin'), deleteQuiz);

export default router;