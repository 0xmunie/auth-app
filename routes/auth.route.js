import express from 'express';
import { changePassword, forgetPassword, login, logout, signup, verify } from '../controllers/auth.controller.js';
import { changePasswordValidator, forgetPasswordValidator, loginValidator, signupValidator, verifyValidator } from '../middlewares/validator.middleware.js';
import authMiddleware from '../middlewares/auth.middleware.js';
import { loginLimiter } from '../middlewares/rate_limit.middleware.js';

const router = express.Router();

router.post('/login', loginLimiter, loginValidator, login);
router.post('/signup', signupValidator, signup);
router.get('/logout', authMiddleware, logout);

router.post('/verify', authMiddleware, verifyValidator, verify);

router.post('/forget-password', forgetPasswordValidator, forgetPassword);
router.post('/change-password', changePasswordValidator, changePassword);

export default router;