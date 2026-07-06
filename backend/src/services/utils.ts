import { authenticator } from 'otplib';
import crypto from 'crypto';
import { config } from '../config';

const otpStore = new Map<string, { otp: string; expiry: number }>();

// In production, use Twilio/MSG91 for SMS
// For development, OTP is 123456 for easy testing
const DEV_OTP = '123456';

export const generateOTP = (phone: string): string => {
  if (config.nodeEnv === 'development') {
    otpStore.set(phone, {
      otp: DEV_OTP,
      expiry: Date.now() + config.otpExpiryMinutes * 60 * 1000,
    });
    return DEV_OTP;
  }

  const otp = authenticator.generate(crypto.randomBytes(32).toString('hex'));
  const code = otp.slice(0, 6);

  otpStore.set(phone, {
    otp: code,
    expiry: Date.now() + config.otpExpiryMinutes * 60 * 1000,
  });

  return code;
};

export const verifyOTP = (phone: string, otp: string): boolean => {
  const stored = otpStore.get(phone);

  if (!stored) return false;
  if (Date.now() > stored.expiry) {
    otpStore.delete(phone);
    return false;
  }
  if (stored.otp !== otp) return false;

  otpStore.delete(phone);
  return true;
};

export const generateBookingId = (): string => {
  const prefix = 'ACR';
  const num = Math.floor(Math.random() * 90000) + 10000;
  return `${prefix}-${num}`;
};

export const generateInvoiceNumber = (): string => {
  const prefix = 'INV';
  const num = Math.floor(Math.random() * 900000) + 100000;
  return `${prefix}-${num}`;
};

export const generateToken = (): string => {
  return crypto.randomBytes(32).toString('hex');
};

export const calculateDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number => {
  const R = 6371; // Earth's radius in km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const toRad = (deg: number): number => (deg * Math.PI) / 180;

export const parseJsonField = (field: string | null | undefined): any => {
  if (!field) return null;
  try {
    return JSON.parse(field);
  } catch {
    return null;
  }
};

export const slugify = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/^-+|-+$/g, '');
};