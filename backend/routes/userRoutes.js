import express from 'express';
import { getMe, getMyProgress } from '../controllers/userController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Protect all routes after this middleware
router.use(protect);

router.get('/me', getMe);
router.get('/me/progress', getMyProgress);

export default router;