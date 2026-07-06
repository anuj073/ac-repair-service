import { z } from 'zod';

export const sendOtpSchema = z.object({
  phone: z.string().regex(/^[6-9]\d{9}$/, 'Invalid Indian phone number'),
});

export const verifyOtpSchema = z.object({
  phone: z.string().regex(/^[6-9]\d{9}$/, 'Invalid Indian phone number'),
  otp: z.string().length(6, 'OTP must be 6 digits'),
});

export const registerSchema = z.object({
  phone: z.string().regex(/^[6-9]\d{9}$/),
  otp: z.string().length(6),
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email().optional(),
  password: z.string().min(6, 'Password must be at least 6 characters').optional(),
});

export const loginSchema = z.object({
  phone: z.string().regex(/^[6-9]\d{9}$/),
  otp: z.string().length(6),
});

export const updateProfileSchema = z.object({
  name: z.string().min(2).max(100).optional(),
  email: z.string().email().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  pincode: z.string().optional(),
  latitude: z.number().min(-90).max(90).optional(),
  longitude: z.number().min(-180).max(180).optional(),
  language: z.enum(['en', 'hi']).optional(),
});

export const addAddressSchema = z.object({
  label: z.enum(['Home', 'Work', 'Other']).default('Home'),
  address: z.string().min(5, 'Address must be at least 5 characters'),
  city: z.string().min(2),
  state: z.string().min(2),
  pincode: z.string().regex(/^[1-9]\d{5}$/, 'Invalid pincode'),
  latitude: z.number().min(-90).max(90).optional(),
  longitude: z.number().min(-180).max(180).optional(),
  isDefault: z.boolean().default(false),
});

export const createBookingSchema = z.object({
  serviceId: z.string().uuid(),
  acType: z.string().optional(),
  brand: z.string().optional(),
  issue: z.string().optional(),
  preferredDate: z.string().refine((d) => !isNaN(Date.parse(d)), 'Invalid date'),
  preferredTime: z.string(),
  isEmergency: z.boolean().default(false),
  addressId: z.string().uuid().optional(),
  address: z.string().min(5),
  city: z.string().min(2),
  state: z.string().min(2),
  pincode: z.string().regex(/^[1-9]\d{5}$/),
  latitude: z.number().min(-90).max(90).optional(),
  longitude: z.number().min(-180).max(180).optional(),
  notes: z.string().max(500).optional(),
  couponCode: z.string().optional(),
});

export const createServiceSchema = z.object({
  categoryId: z.string().uuid(),
  name: z.string().min(2).max(200),
  description: z.string().optional(),
  shortDesc: z.string().max(200).optional(),
  price: z.number().positive(),
  discountedPrice: z.number().positive().optional(),
  duration: z.number().int().positive(),
  isPopular: z.boolean().default(false),
  isEmergency: z.boolean().default(false),
  warrantyDays: z.number().int().default(30),
  sortOrder: z.number().int().default(0),
  tags: z.string().optional(),
});

export const createCategorySchema = z.object({
  name: z.string().min(2).max(100),
  description: z.string().optional(),
  sortOrder: z.number().int().default(0),
});

export const couponSchema = z.object({
  code: z.string().min(3).max(20).transform((s) => s.toUpperCase()),
  description: z.string().optional(),
  discountType: z.enum(['PERCENTAGE', 'FIXED']),
  discountValue: z.number().positive(),
  minOrderAmount: z.number().default(0),
  maxDiscount: z.number().positive().optional(),
  maxUsage: z.number().int().default(100),
  isFirstBooking: z.boolean().default(false),
  validForServices: z.string().optional(),
  validFrom: z.string(),
  validTo: z.string(),
});

export const updateBookingStatusSchema = z.object({
  status: z.enum([
    'CONFIRMED',
    'ASSIGNED',
    'ON_THE_WAY',
    'WORKING',
    'COMPLETED',
    'CANCELLED',
  ]),
  technicianId: z.string().uuid().optional(),
  cancellationReason: z.string().optional(),
  finalPrice: z.number().positive().optional(),
});

export const createReviewSchema = z.object({
  bookingId: z.string().uuid(),
  rating: z.number().int().min(1).max(5),
  comment: z.string().max(1000).optional(),
});

export const createBlogSchema = z.object({
  title: z.string().min(5).max(200),
  excerpt: z.string().max(300).optional(),
  content: z.string().min(10),
  category: z.string().optional(),
  tags: z.string().optional(),
  metaTitle: z.string().max(60).optional(),
  metaDesc: z.string().max(160).optional(),
  isPublished: z.boolean().default(false),
});

export const createFaqSchema = z.object({
  question: z.string().min(5).max(500),
  answer: z.string().min(10),
  category: z.string().optional(),
  sortOrder: z.number().int().default(0),
});