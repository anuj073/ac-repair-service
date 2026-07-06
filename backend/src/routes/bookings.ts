import { Router } from 'express';
import { createBooking, getMyBookings, getBookingById, cancelBooking, updateBookingStatus, createReview } from '../controllers/bookingController';
import { authenticate } from '../middleware/auth';
import { validate } from '../middleware/validate';
import { createBookingSchema, createReviewSchema, updateBookingStatusSchema } from '../validators';

const router = Router();

router.post('/', authenticate, validate(createBookingSchema), createBooking);
router.get('/', authenticate, getMyBookings);
router.get('/:id', authenticate, getBookingById);
router.post('/:id/cancel', authenticate, cancelBooking);
router.put('/:id/status', authenticate, validate(updateBookingStatusSchema), updateBookingStatus);
router.post('/review', authenticate, validate(createReviewSchema), createReview);

export default router;