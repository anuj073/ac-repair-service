import { Response } from 'express';
import prisma from '../config/database';
import { AuthRequest } from '../middleware/auth';
import { AppError } from '../middleware/errorHandler';
import { getCache, setCache, deleteCache } from '../config/redis';

export const getCategories = async (_req: AuthRequest, res: Response): Promise<void> => {
  try {
    const cacheKey = 'service:categories';
    const cached = await getCache(cacheKey);
    if (cached) {
      res.json({ success: true, data: JSON.parse(cached) });
      return;
    }

    const categories = await prisma.serviceCategory.findMany({
      where: { isActive: true },
      include: {
        services: {
          where: { isActive: true },
          orderBy: { sortOrder: 'asc' },
        },
      },
      orderBy: { sortOrder: 'asc' },
    });

    await setCache(cacheKey, JSON.stringify(categories), 600);
    res.json({ success: true, data: categories });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch categories' });
  }
};

export const getServices = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { category, popular, emergency } = req.query;
    const where: any = { isActive: true };

    if (category) where.category = { slug: String(category) };
    if (popular === 'true') where.isPopular = true;
    if (emergency === 'true') where.isEmergency = true;

    const services = await prisma.service.findMany({
      where,
      include: {
        category: { select: { id: true, name: true, slug: true } },
      },
      orderBy: { sortOrder: 'asc' },
    });

    res.json({ success: true, data: services });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch services' });
  }
};

export const getServiceBySlug = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { slug } = req.params;
    const service = await prisma.service.findUnique({
      where: { slug },
      include: {
        category: true,
      },
    });

    if (!service) {
      res.status(404).json({ success: false, message: 'Service not found' });
      return;
    }

    res.json({ success: true, data: service });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch service' });
  }
};

export const createService = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const data = req.body;
    const slug = data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const service = await prisma.service.create({
      data: { ...data, slug },
    });

    await deleteCache('service:*');
    res.status(201).json({ success: true, data: service });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to create service' });
  }
};

export const updateService = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const data = req.body;

    if (data.name) {
      data.slug = data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    }

    const service = await prisma.service.update({
      where: { id },
      data,
    });

    await deleteCache('service:*');
    res.json({ success: true, data: service });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update service' });
  }
};

export const deleteService = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    await prisma.service.update({
      where: { id },
      data: { isActive: false },
    });

    await deleteCache('service:*');
    res.json({ success: true, message: 'Service deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete service' });
  }
};

export const createCategory = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { name, description, sortOrder } = req.body;
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const category = await prisma.serviceCategory.create({
      data: { name, slug, description, sortOrder },
    });

    await deleteCache('service:*');
    res.status(201).json({ success: true, data: category });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to create category' });
  }
};