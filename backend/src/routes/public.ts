import { Router } from 'express';
import prisma from '../config/database';
import { AuthRequest } from '../middleware/auth';
import { Response } from 'express';
import { getCache, setCache } from '../config/redis';

const router = Router();

// Blogs
router.get('/blogs', async (req: AuthRequest, res: Response) => {
  try {
    const { page = '1', limit = '10', category } = req.query;
    const where: any = { isPublished: true };
    if (category) where.category = String(category);

    const [blogs, total] = await Promise.all([
      prisma.blog.findMany({
        where,
        select: {
          id: true, title: true, slug: true, excerpt: true, coverImage: true,
          author: true, category: true, tags: true, publishedAt: true, viewCount: true,
        },
        orderBy: { publishedAt: 'desc' },
        skip: (parseInt(String(page)) - 1) * parseInt(String(limit)),
        take: parseInt(String(limit)),
      }),
      prisma.blog.count({ where }),
    ]);

    res.json({
      success: true,
      data: { blogs, pagination: { total, page: parseInt(String(page)), totalPages: Math.ceil(total / parseInt(String(limit))) } },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch blogs' });
  }
});

router.get('/blogs/:slug', async (req: AuthRequest, res: Response) => {
  try {
    const blog = await prisma.blog.findUnique({
      where: { slug: req.params.slug, isPublished: true },
    });

    if (!blog) {
      res.status(404).json({ success: false, message: 'Blog not found' });
      return;
    }

    await prisma.blog.update({ where: { id: blog.id }, data: { viewCount: { increment: 1 } } });
    res.json({ success: true, data: blog });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch blog' });
  }
});

// FAQs
router.get('/faqs', async (_req: AuthRequest, res: Response) => {
  try {
    const cached = await getCache('content:faqs');
    if (cached) {
      res.json({ success: true, data: JSON.parse(cached) });
      return;
    }

    const faqs = await prisma.fAQ.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: 'asc' },
    });

    await setCache('content:faqs', JSON.stringify(faqs), 600);
    res.json({ success: true, data: faqs });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch FAQs' });
  }
});

// Reviews (public)
router.get('/reviews', async (_req: AuthRequest, res: Response) => {
  try {
    const cached = await getCache('content:reviews');
    if (cached) {
      res.json({ success: true, data: JSON.parse(cached) });
      return;
    }

    const reviews = await prisma.review.findMany({
      where: { isApproved: true },
      include: {
        customer: { select: { name: true, avatar: true, city: true } },
        booking: { select: { service: { select: { name: true } } } },
      },
      orderBy: { createdAt: 'desc' },
      take: 20,
    });

    await setCache('content:reviews', JSON.stringify(reviews), 300);
    res.json({ success: true, data: reviews });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch reviews' });
  }
});

// Cities
router.get('/cities', async (_req: AuthRequest, res: Response) => {
  try {
    const cities = await prisma.city.findMany({
      where: { isActive: true },
      include: {
        areas: { where: { isActive: true }, select: { id: true, name: true, pincode: true } },
        pincodes: { where: { isActive: true }, select: { id: true, pincode: true } },
      },
    });
    res.json({ success: true, data: cities });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch cities' });
  }
});

// Check pincode availability
router.get('/check-pincode/:pincode', async (req: AuthRequest, res: Response) => {
  try {
    const pincode = await prisma.pincode.findFirst({
      where: { pincode: req.params.pincode, isActive: true },
      include: { city: true },
    });

    res.json({
      success: true,
      data: {
        available: !!pincode,
        city: pincode?.city,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to check pincode' });
  }
});

// Banners
router.get('/banners', async (_req: AuthRequest, res: Response) => {
  try {
    const banners = await prisma.banner.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: 'asc' },
    });
    res.json({ success: true, data: banners });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch banners' });
  }
});

export default router;