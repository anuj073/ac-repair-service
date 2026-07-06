import { Response } from 'express';
import prisma from '../config/database';
import { AuthRequest } from '../middleware/auth';

export const getDashboard = async (_req: AuthRequest, res: Response): Promise<void> => {
  try {
    const [
      totalBookings,
      totalCustomers,
      totalTechnicians,
      completedBookings,
      pendingBookings,
      totalRevenue,
      recentBookings,
      popularServices,
    ] = await Promise.all([
      prisma.booking.count(),
      prisma.user.count({ where: { role: 'CUSTOMER' } }),
      prisma.user.count({ where: { role: 'TECHNICIAN' } }),
      prisma.booking.count({ where: { status: 'COMPLETED' } }),
      prisma.booking.count({ where: { status: 'PENDING' } }),
      prisma.booking.aggregate({ _sum: { totalAmount: true }, where: { status: 'COMPLETED' } }),
      prisma.booking.findMany({
        take: 10,
        orderBy: { createdAt: 'desc' },
        include: {
          customer: { select: { name: true, phone: true } },
          service: { select: { name: true } },
        },
      }),
      prisma.service.findMany({
        take: 5,
        orderBy: { bookings: { _count: 'desc' } },
        include: { _count: { select: { bookings: true } } },
      }),
    ]);

    res.json({
      success: true,
      data: {
        stats: {
          totalBookings,
          totalCustomers,
          totalTechnicians,
          completedBookings,
          pendingBookings,
          totalRevenue: totalRevenue._sum.totalAmount || 0,
        },
        recentBookings,
        popularServices,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch dashboard' });
  }
};

export const getAllBookings = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { status, page = '1', limit = '20', search } = req.query;
    const skip = (parseInt(String(page)) - 1) * parseInt(String(limit));

    const where: any = {};
    if (status) where.status = String(status).toUpperCase();
    if (search) {
      where.OR = [
        { bookingId: { contains: String(search) } },
        { customer: { name: { contains: String(search) } } },
        { customer: { phone: { contains: String(search) } } },
      ];
    }

    const [bookings, total] = await Promise.all([
      prisma.booking.findMany({
        where,
        include: {
          customer: { select: { id: true, name: true, phone: true } },
          technician: { select: { id: true, name: true, phone: true } },
          service: { select: { name: true, price: true } },
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: parseInt(String(limit)),
      }),
      prisma.booking.count({ where }),
    ]);

    res.json({
      success: true,
      data: {
        bookings,
        pagination: {
          total,
          page: parseInt(String(page)),
          totalPages: Math.ceil(total / parseInt(String(limit))),
        },
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch bookings' });
  }
};

export const getAllCustomers = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { page = '1', limit = '20', search } = req.query;
    const skip = (parseInt(String(page)) - 1) * parseInt(String(limit));

    const where: any = { role: 'CUSTOMER' };
    if (search) {
      where.OR = [
        { name: { contains: String(search) } },
        { phone: { contains: String(search) } },
        { email: { contains: String(search) } },
      ];
    }

    const [customers, total] = await Promise.all([
      prisma.user.findMany({
        where,
        select: {
          id: true, name: true, email: true, phone: true, isVerified: true,
          createdAt: true, city: true,
          _count: { select: { bookingsAsCustomer: true } },
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: parseInt(String(limit)),
      }),
      prisma.user.count({ where }),
    ]);

    res.json({
      success: true,
      data: {
        customers,
        pagination: { total, page: parseInt(String(page)), totalPages: Math.ceil(total / parseInt(String(limit))) },
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch customers' });
  }
};

export const getAllTechnicians = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const technicians = await prisma.user.findMany({
      where: { role: 'TECHNICIAN' },
      select: {
        id: true, name: true, email: true, phone: true, avatar: true,
        isAvailable: true, isVerifiedTech: true, rating: true, totalRatings: true,
        completedJobs: true, experience: true, specialization: true,
        city: true, serviceAreas: true,
        createdAt: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    res.json({ success: true, data: technicians });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch technicians' });
  }
};

export const getRevenue = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { from, to } = req.query;
    const startDate = from ? new Date(String(from)) : new Date(new Date().setMonth(new Date().getMonth() - 1));
    const endDate = to ? new Date(String(to)) : new Date();

    const completedBookings = await prisma.booking.findMany({
      where: {
        status: 'COMPLETED',
        completedAt: { gte: startDate, lte: endDate },
      },
      select: { totalAmount: true, finalPrice: true, completedAt: true },
    });

    const totalRevenue = completedBookings.reduce((sum, b) => sum + (b.finalPrice || b.totalAmount), 0);

    // Group by month for chart
    const monthlyRevenue = completedBookings.reduce((acc: any, b) => {
      const month = b.completedAt?.toISOString().slice(0, 7);
      if (month) {
        acc[month] = (acc[month] || 0) + (b.finalPrice || b.totalAmount);
      }
      return acc;
    }, {});

    res.json({
      success: true,
      data: {
        totalRevenue: Math.round(totalRevenue),
        totalBookings: completedBookings.length,
        monthlyRevenue,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch revenue' });
  }
};

export const updateCoupon = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const data = req.body;
    const coupon = await prisma.coupon.update({ where: { id }, data });
    res.json({ success: true, data: coupon });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update coupon' });
  }
};

export const createCoupon = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const coupon = await prisma.coupon.create({
      data: {
        ...req.body,
        code: String(req.body.code).toUpperCase(),
        validFrom: new Date(req.body.validFrom),
        validTo: new Date(req.body.validTo),
      },
    });
    res.status(201).json({ success: true, data: coupon });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to create coupon' });
  }
};

export const getCoupons = async (_req: AuthRequest, res: Response): Promise<void> => {
  try {
    const coupons = await prisma.coupon.findMany({ orderBy: { createdAt: 'desc' } });
    res.json({ success: true, data: coupons });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch coupons' });
  }
};

export const getCities = async (_req: AuthRequest, res: Response): Promise<void> => {
  try {
    const cities = await prisma.city.findMany({
      where: { isActive: true },
      include: {
        areas: { where: { isActive: true } },
        pincodes: { where: { isActive: true } },
      },
    });
    res.json({ success: true, data: cities });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch cities' });
  }
};

export const getPincodes = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const pincodes = await prisma.pincode.findMany({
      where: { isActive: true },
      include: { city: true },
    });
    res.json({ success: true, data: pincodes });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch pincodes' });
  }
};