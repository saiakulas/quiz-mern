import Quiz from '../models/Quiz.js';
import Question from '../models/Question.js';
import AppError from '../utils/appError.js';
import catchAsync from '../utils/catchAsync.js';

export const createQuizWithQuestions = catchAsync(async (req, res, next) => {
  const { title, description, questions } = req.body;

  // Validate input
  if (!questions || !Array.isArray(questions) || questions.length === 0) {
    return next(new AppError('Please provide an array of questions', 400));
  }

  // Create the quiz
  const quiz = await Quiz.create({
    title,
    description,
    createdBy: req.user.id
  });

  // Prepare questions with quiz reference
  const quizQuestions = questions.map(question => ({
    quiz: quiz._id,
    questionText: question.questionText,
    options: question.options,
    correctAnswer: question.correctAnswer,
    points: question.points || 1, // Default to 1 point if not specified
    createdAt: new Date()
  }));

  // Insert questions
  const createdQuestions = await Question.insertMany(quizQuestions);

  res.status(201).json({
    status: 'success',
    data: {
      quiz,
      questions: createdQuestions
    }
  });
});

export const getAllQuizzes = catchAsync(async (req, res, next) => {
  const quizzes = await Quiz.find({ isActive: true }).populate('createdBy', 'name');
  
  res.status(200).json({
    status: 'success',
    results: quizzes.length,
    data: {
      quizzes
    }
  });
});

export const getQuiz = catchAsync(async (req, res, next) => {
  const quiz = await Quiz.findById(req.params.quizId).populate('createdBy', 'name');
  
  if (!quiz) {
    return next(new AppError('No quiz found with that ID', 404));
  }
  
  // Get questions for this quiz
  const questions = await Question.find({ quiz: quiz._id }).select('-correctAnswer');
  
  res.status(200).json({
    status: 'success',
    data: {
      quiz,
      questions
    }
  });
});

export const updateQuiz = catchAsync(async (req, res, next) => {
  const quiz = await Quiz.findByIdAndUpdate(
    req.params.quizId,
    req.body,
    {
      new: true,
      runValidators: true
    }
  );
  
  if (!quiz) {
    return next(new AppError('No quiz found with that ID', 404));
  }
  
  res.status(200).json({
    status: 'success',
    data: {
      quiz
    }
  });
});

export const deleteQuiz = catchAsync(async (req, res, next) => {
  const quiz = await Quiz.findByIdAndUpdate(
    req.params.quizId,
    { isActive: false },
    { new: true }
  );
  
  if (!quiz) {
    return next(new AppError('No quiz found with that ID', 404));
  }
  
  res.status(204).json({
    status: 'success',
    data: null
  });
});