import User from '../models/User.js';
import Result from '../models/Result.js';
import AppError from '../utils/appError.js';
import catchAsync from '../utils/catchAsync.js';

export const getMe = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  
  res.status(200).json({
    status: 'success',
    data: {
      user
    }
  });
});

export const getMyProgress = catchAsync(async (req, res, next) => {
  const results = await Result.find({ user: req.user.id })
    .populate('quiz', 'title')
    .sort('-submittedAt');
  
  // Calculate overall progress
  const totalQuizzesTaken = results.length;
  const totalCorrectAnswers = results.reduce((sum, result) => sum + result.score, 0);
  const totalQuestions = results.reduce((sum, result) => sum + result.totalQuestions, 0);
  const overallPercentage = totalQuestions > 0 ? (totalCorrectAnswers / totalQuestions) * 100 : 0;
  
  res.status(200).json({
    status: 'success',
    data: {
      results,
      stats: {
        totalQuizzesTaken,
        totalCorrectAnswers,
        totalQuestions,
        overallPercentage
      }
    }
  });
});