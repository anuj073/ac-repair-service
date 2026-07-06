import { Response } from 'express';
import prisma from '../config/database';
import { AuthRequest } from '../middleware/auth';
import { generateBookingId, generateInvoiceNumber } from '../services/utils';

export const createBooking = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const {
      serviceId, acType, brand, issue, preferredDate, preferredTime,
      isEmergency, address, city, state, pincode, latitude, longitude,
      notes, couponCode,
    } = req.body;

    // Verify service exists
    const service = await prisma.service.findUnique({
      where: { id: serviceId },
    });

    if (!service || !service.isActive) {
      res.status(400).json({ success: false, message: 'Service not available' });
      return;
    }

    // Validate coupon if provided
    let discountAmount = 0;
    let couponId: string | null = null;

    if (couponCode) {
      const coupon = await prisma.coupon.findUnique({
        where: { code: couponCode.toUpperCase() },
      });

      if (
        coupon && coupon.isActive &&
        new Date() >= coupon.validFrom &&
        new Date() <= coupon.validTo &&
        coupon.usedCount < coupon.maxUsage &&
        service.price >= coupon.minOrderAmount
      ) {
        couponId = coupon.id;
        discountAmount = coupon.discountType === 'PERCENTAGE'
          ? Math.min(service.price * coupon.discountValue / 100, coupon.maxDiscount || Infinity)
          : coupon.discountValue;

        await prisma.coupon.update({
          where: { id: coupon.id },
          data: { usedCount: { increment: 1 } },
        });
      }
    }

    const totalAmount = service.price - discountAmount;

    // Create booking
    const booking = await prisma.booking.create({
      data: {
        bookingId: generateBookingId(),
        customerId: req.user!.id,
        serviceId,
        acType,
        brand,
        issue,
        preferredDate: new Date(preferredDate),
        preferredTime,
        isEmergency: isEmergency || false,
        address,
        city,
        state,
        pincode,
        latitude: latitude || null,
        longitude: longitude || null,
        estimatedPrice: service.price,
        discountAmount,
        couponId: couponId || undefined,
        totalAmount,
        notes,
        status: 'PENDING',
      },
      include: {
        service: { select: { name: true, duration: true } },
        customer: { select: { name: true, phone: true } },
      },
    });

    // Create notification
    await prisma.notification.create({
      data: {
        userId: req.user!.id,
        type: 'BOOKING_CONFIRMED',
        title: 'Booking Confirmed',
        message: `Your booking ${booking.bookingId} has been confirmed. We will assign a technician shortly.`,
        bookingId: booking.id,
        data: JSON.stringify({ bookingId: booking.bookingId }),
      },
    });

    res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      data: booking,
    });
  } catch (error) {
    console.error('Create booking error:', error);
    res.status(500).json({ success: false, message: 'Failed to create booking' });
  }
};

export const getMyBookings = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { status, page = '1', limit = '10' } = req.query;
    const skip = (parseInt(String(page)) - 1) * parseInt(String(limit));
    const take = parseInt(String(limit));

    const where: any = { customerId: req.user!.id };
    if (status) where.status = String(status).toUpperCase();

    const [bookings, total] = await Promise.all([
      prisma.booking.findMany({
        where,
        include: {
          service: { select: { name: true, slug: true, icon: true } },
          technician: { select: { id: true, name: true, phone: true, avatar: true, rating: true } },
          review: { select: { id: true, rating: true } },
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take,
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
          limit: take,
          totalPages: Math.ceil(total / take),
        },
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch bookings' });
  }
};

export const getBookingById = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const booking = await prisma.booking.findUnique({
      where: { id },
      include: {
        service: true,
        customer: { select: { id: true, name: true, phone: true } },
        technician: { select: { id: true, name: true, phone: true, avatar: true, rating: true } },
        review: true,
        payment: true,
        invoice: true,
      },
    });

    if (!booking) {
      res.status(404).json({ success: false, message: 'Booking not found' });
      return;
    }

    // Only allow customer, assigned tech, or admin
    if (
      booking.customerId !== req.user!.id &&
      booking.technicianId !== req.user!.id &&
      req.user!.role !== 'ADMIN'
    ) {
      res.status(403).json({ success: false, message: 'Access denied' });
      return;
    }

    res.json({ success: true, data: booking });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch booking' });
  }
};

export const cancelBooking = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { reason } = req.body;

    const booking = await prisma.booking.findUnique({
      where: { id },
    });

    if (!booking || booking.customerId !== req.user!.id) {
      res.status(404).json({ success: false, message: 'Booking not found' });
      return;
    }

    if (!['PENDING', 'CONFIRMED'].includes(booking.status)) {
      res.status(400).json({ success: false, message: 'Booking cannot be cancelled at this stage' });
      return;
    }

    const updated = await prisma.booking.update({
      where: { id },
      data: {
        status: 'CANCELLED',
        cancellationReason: reason,
        cancelledAt: new Date(),
      },
    });

    res.json({ success: true, message: 'Booking cancelled', data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to cancel booking' });
  }
};

export const updateBookingStatus = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { status, technicianId, finalPrice } = req.body;

    const updateData: any = { status };
    const now = new Date();

    switch (status) {
      case 'CONFIRMED':
        updateData.confirmedAt = now;
        break;
      case 'ASSIGNED':
        updateData.assignedAt = now;
        updateData.technicianId = technicianId;
        break;
      case 'ON_THE_WAY':
        break;
      case 'WORKING':
        updateData.startedAt = now;
        break;
      case 'COMPLETED':
        updateData.completedAt = now;
        updateData.finalPrice = finalPrice;
        break;
      case 'CANCELLED':
        updateData.cancelledAt = now;
        updateData.cancellationReason = req.body.cancellationReason;
        break;
    }

    const booking = await prisma.booking.update({
      where: { id },
      data: updateData,
      include: {
        service: true,
        customer: { select: { id: true, name: true, phone: true } },
        technician: { select: { id: true, name: true, phone: true } },
      },
    });

    // Generate invoice on completion
    if (status === 'COMPLETED' && finalPrice) {
      const invoice = await prisma.invoice.create({
        data: {
          invoiceNumber: generateInvoiceNumber(),
          bookingId: booking.id,
          customerId: booking.customerId,
          technicianId: booking.technicianId,
          subtotal: finalPrice,
          taxAmount: finalPrice * 0.18, // 18% GST
          totalAmount: finalPrice * 1.18,
          paymentStatus: 'PENDING',
        },
      });

      await prisma.booking.update({
        where: { id },
        data: { invoiceId: invoice.id },
      });
    }

    // Notify customer on status change
    await prisma.notification.create({
      data: {
        userId: booking.customerId,
        type: status === 'COMPLETED' ? 'WORK_COMPLETED' : 'BOOKING_CONFIRMED',
        title: `Booking ${status.replace('_', ' ')}`,
        message: `Your booking ${booking.bookingId} is now ${status.replace('_', ' ').toLowerCase()}.`,
        bookingId: booking.id,
        data: JSON.stringify({ bookingId: booking.bookingId, status }),
      },
    });

    res.json({ success: true, data: booking });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update booking status' });
  }
};

export const createReview = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { bookingId, rating, comment } = req.body;

    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
    });

    if (!booking || booking.customerId !== req.user!.id) {
      res.status(404).json({ success: false, message: 'Booking not found' });
      return;
    }

    if (booking.status !== 'COMPLETED') {
      res.status(400).json({ success: false, message: 'Can only review completed bookings' });
      return;
    }

    const review = await prisma.review.create({
      data: {
        bookingId,
        customerId: req.user!.id,
        technicianId: booking.technicianId,
        rating,
        comment,
        isApproved: false,
      },
    });

    // Update technician rating
    if (booking.technicianId) {
      const reviews = await prisma.review.findMany({
        where: { technicianId: booking.technicianId, isApproved: true },
      });

      const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

      await prisma.user.update({
        where: { id: booking.technicianId },
        data: {
          rating: Math.round(avgRating * 10) / 10,
          totalRatings: reviews.length,
        },
      });
    }

    res.status(201).json({ success: true, data: review });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to create review' });
  }
};