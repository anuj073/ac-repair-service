import { Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { config } from '../config';
import prisma from '../config/database';
import { AuthRequest } from '../middleware/auth';
import { generateOTP, verifyOTP } from '../services/utils';

export const sendOtp = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { phone } = req.body;
    const otp = generateOTP(phone);

    console.log(`OTP for ${phone}: ${otp}`); // In production, send via SMS

    res.json({
      success: true,
      message: 'OTP sent successfully',
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to send OTP' });
  }
};

export const verifyOtpAndRegister = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { phone, otp, name, email } = req.body;

    if (!verifyOTP(phone, otp)) {
      res.status(400).json({ success: false, message: 'Invalid or expired OTP' });
      return;
    }

    let user = await prisma.user.findUnique({ where: { phone } });

    if (user) {
      // Update existing user
      user = await prisma.user.update({
        where: { id: user.id },
        data: {
          name: name || user.name,
          email: email || user.email,
          isVerified: true,
        },
      });
    } else {
      // Create new user
      user = await prisma.user.create({
        data: {
          phone,
          name: name || '',
          email,
          isVerified: true,
          role: 'CUSTOMER',
        },
      });
    }

    const accessToken = jwt.sign(
      { id: user.id, phone: user.phone, role: user.role },
      config.jwt.secret,
      { expiresIn: config.jwt.expiresIn } as any
    );

    const refreshToken = jwt.sign(
      { id: user.id },
      config.jwt.refreshSecret,
      { expiresIn: config.jwt.refreshExpiresIn } as any
    );

    await prisma.user.update({
      where: { id: user.id },
      data: { refreshToken },
    });

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: config.nodeEnv === 'production',
      sameSite: 'lax',
      maxAge: 15 * 60 * 1000, // 15 min
    });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: config.nodeEnv === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        user: {
          id: user.id,
          name: user.name,
          phone: user.phone,
          email: user.email,
          role: user.role,
          avatar: user.avatar,
        },
        accessToken,
      },
    });
  } catch (error) {
    console.error('Auth error:', error);
    res.status(500).json({ success: false, message: 'Authentication failed' });
  }
};

export const refreshTokenHandler = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const refreshToken = req.cookies?.refreshToken || req.body.refreshToken;

    if (!refreshToken) {
      res.status(401).json({ success: false, message: 'Refresh token required' });
      return;
    }

    const decoded = jwt.verify(refreshToken, config.jwt.refreshSecret) as { id: string };

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: { id: true, phone: true, role: true, refreshToken: true, isActive: true },
    });

    if (!user || !user.isActive || user.refreshToken !== refreshToken) {
      res.status(401).json({ success: false, message: 'Invalid refresh token' });
      return;
    }

    const newAccessToken = jwt.sign(
      { id: user.id, phone: user.phone, role: user.role },
      config.jwt.secret,
      { expiresIn: config.jwt.expiresIn } as any
    );

    const newRefreshToken = jwt.sign(
      { id: user.id },
      config.jwt.refreshSecret,
      { expiresIn: config.jwt.refreshExpiresIn } as any
    );

    await prisma.user.update({
      where: { id: user.id },
      data: { refreshToken: newRefreshToken },
    });

    res.cookie('accessToken', newAccessToken, {
      httpOnly: true,
      secure: config.nodeEnv === 'production',
      sameSite: 'lax',
      maxAge: 15 * 60 * 1000,
    });

    res.cookie('refreshToken', newRefreshToken, {
      httpOnly: true,
      secure: config.nodeEnv === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({
      success: true,
      data: { accessToken: newAccessToken },
    });
  } catch (error) {
    res.status(401).json({ success: false, message: 'Token refresh failed' });
  }
};

export const logout = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (req.user) {
      await prisma.user.update({
        where: { id: req.user.id },
        data: { refreshToken: null },
      });
    }

    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');

    res.json({ success: true, message: 'Logged out successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Logout failed' });
  }
};

export const getProfile = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user!.id },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        avatar: true,
        role: true,
        address: true,
        city: true,
        state: true,
        pincode: true,
        language: true,
        createdAt: true,
        addresses: true,
        _count: {
          select: {
            bookingsAsCustomer: true,
            notifications: true,
          },
        },
      },
    });

    res.json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch profile' });
  }
};

export const updateProfile = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const user = await prisma.user.update({
      where: { id: req.user!.id },
      data: req.body,
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        avatar: true,
        address: true,
        city: true,
        state: true,
        pincode: true,
        language: true,
      },
    });

    res.json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update profile' });
  }
};

export const getMe = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user!.id },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        avatar: true,
        role: true,
        isVerified: true,
        address: true,
        city: true,
        state: true,
        pincode: true,
        language: true,
      },
    });

    res.json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch user' });
  }
};