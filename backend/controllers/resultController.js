import Result from '../models/Result.js';
import Quiz from '../models/Quiz.js';
import Question from '../models/Question.js';
import AppError from '../utils/appError.js';
import catchAsync from '../utils/catchAsync.js';

export const submitQuiz = catchAsync(async (req, res, next) => {
  const { answers } = req.body;
  const { quizId } = req.params;
  const userId = req.user.id;

  // Get the quiz and questions
  const quiz = await Quiz.findById(quizId);
  if (!quiz) {
    return next(new AppError('No quiz found with that ID', 404));
  }

  const questions = await Question.find({ quiz: quizId });
  const totalQuestions = questions.length;

  // Validate that all questions were answered
  if (answers.length !== totalQuestions) {
    return next(new AppError(`Please answer all ${totalQuestions} questions`, 400));
  }

  // Calculate score
  let score = 0;
  const resultAnswers = [];

  for (const question of questions) {
    const userAnswer = answers.find(a => a.questionId.toString() === question._id.toString());
    
    if (!userAnswer) {
      return next(new AppError(`Missing answer for question ${question._id}`, 400));
    }

    const isCorrect = userAnswer.selectedOption === question.correctAnswer;
    if (isCorrect) {
      score += question.points;
    }

    resultAnswers.push({
      question: question._id,
      selectedOption: userAnswer.selectedOption,
      isCorrect
    });
  }

  // Create result
  const result = await Result.create({
    user: userId,
    quiz: quizId,
    score,
    totalQuestions,
    answers: resultAnswers
  });

  res.status(201).json({
    status: 'success',
    data: {
      result
    }
  });
});

export const getUserResults = catchAsync(async (req, res, next) => {
  const results = await Result.find({ user: req.params.userId })
    .populate('quiz', 'title')
    .sort('-submittedAt');

  res.status(200).json({
    status: 'success',
    results: results.length,
    data: {
      results
    }
  });
});

export const getQuizResults = catchAsync(async (req, res, next) => {
  const results = await Result.find({ quiz: req.params.quizId })
    .populate('user', 'name')
    .sort('-submittedAt');

  res.status(200).json({
    status: 'success',
    results: results.length,
    data: {
      results
    }
  });
});