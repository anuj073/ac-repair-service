import { Router } from 'express';
import { getCategories, getServices, getServiceBySlug, createCategory, createService, updateService, deleteService } from '../controllers/serviceController';
import { authenticate, authorize } from '../middleware/auth';
import { validate } from '../middleware/validate';
import { createServiceSchema, createCategorySchema } from '../validators';

const router = Router();

router.get('/categories', getCategories);
router.get('/', getServices);
router.get('/:slug', getServiceBySlug);

// Admin routes
router.post('/categories', authenticate, authorize('ADMIN', 'SUPER_ADMIN'), validate(createCategorySchema), createCategory);
router.post('/', authenticate, authorize('ADMIN', 'SUPER_ADMIN'), validate(createServiceSchema), createService);
router.put('/:id', authenticate, authorize('ADMIN', 'SUPER_ADMIN'), updateService);
router.delete('/:id', authenticate, authorize('ADMIN', 'SUPER_ADMIN'), deleteService);

export default router;