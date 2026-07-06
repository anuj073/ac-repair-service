import { Router } from 'express';
import { sendOtp, verifyOtpAndRegister, refreshTokenHandler, logout, getProfile, updateProfile, getMe } from '../controllers/authController';
import { authenticate } from '../middleware/auth';
import { validate } from '../middleware/validate';
import { sendOtpSchema, verifyOtpSchema, updateProfileSchema, registerSchema } from '../validators';

const router = Router();

router.post('/send-otp', validate(sendOtpSchema), sendOtp);
router.post('/verify-otp', validate(verifyOtpSchema), verifyOtpAndRegister);
router.post('/register', validate(registerSchema), verifyOtpAndRegister);
router.post('/refresh', refreshTokenHandler);
router.post('/logout', authenticate, logout);
router.get('/me', authenticate, getMe);
router.get('/profile', authenticate, getProfile);
router.patch('/profile', authenticate, validate(updateProfileSchema), updateProfile);

export default router;