import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import path from 'path';
import { config } from './config';
import { errorHandler, notFoundHandler } from './middleware/errorHandler';
import authRoutes from './routes/auth';
import serviceRoutes from './routes/services';
import bookingRoutes from './routes/bookings';
import adminRoutes from './routes/admin';
import publicRoutes from './routes/public';

const app = express();

// Security
app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' },
  contentSecurityPolicy: false,
}));

// CORS
app.use(cors({
  origin: config.frontendUrl,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Compression
app.use(compression());

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Rate limiting
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many requests, please try again later.' },
});

const authLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 10,
  message: { success: false, message: 'Too many OTP requests. Please try again later.' },
});

// Static files
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Apply rate limiting
app.use('/api/', apiLimiter);
app.use('/api/v1/auth/', authLimiter);

// API Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/services', serviceRoutes);
app.use('/api/v1/bookings', bookingRoutes);
app.use('/api/v1/admin', adminRoutes);
app.use('/api/v1', publicRoutes);

// Health check
app.get('/api/health', (_req, res) => {
  res.json({
    success: true,
    message: 'AC Repair API is running',
    timestamp: new Date().toISOString(),
    environment: config.nodeEnv,
  });
});

// Error handling
app.use(notFoundHandler);
app.use(errorHandler);

// Start server
if (require.main === module) {
  app.listen(config.port, () => {
    console.log(`
╔══════════════════════════════════════════════╗
║         AC REPAIR SERVICE API               ║
║──────────────────────────────────────────────║
║  Status: Running                            ║
║  Port: ${String(config.port).padEnd(35)}║
║  Environment: ${config.nodeEnv.padEnd(29)}║
║  Frontend: ${config.frontendUrl.padEnd(32)}║
╚══════════════════════════════════════════════╝
    `);
  });
}

export default app;