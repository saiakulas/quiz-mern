import express from 'express';
import { register, login } from '../controllers/authController.js';

const router = express.Router();

// Public routes
router.post('/register', register);
router.post('/login', login);

// Protected routes (example)
// router.get('/profile', verifyUser, getProfile);
export default router;