import { Router } from 'express';
import {
  getDashboard, getAllBookings, getAllCustomers, getAllTechnicians,
  getRevenue, getCoupons, createCoupon, updateCoupon,
  getCities, getPincodes,
} from '../controllers/adminController';
import { authenticate, authorize } from '../middleware/auth';

const router = Router();

router.use(authenticate, authorize('ADMIN', 'SUPER_ADMIN'));

router.get('/dashboard', getDashboard);
router.get('/bookings', getAllBookings);
router.get('/customers', getAllCustomers);
router.get('/technicians', getAllTechnicians);
router.get('/revenue', getRevenue);
router.get('/coupons', getCoupons);
router.post('/coupons', createCoupon);
router.put('/coupons/:id', updateCoupon);
router.get('/cities', getCities);
router.get('/pincodes', getPincodes);

export default router;