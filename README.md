# CoolFix Pro - AC Repair & Home Appliance Service Platform

A production-ready, premium AC Repair & Home Appliance Service website for Indian customers. Built with Next.js 16, Express.js, TypeScript, PostgreSQL, and modern UI/UX.

## 🚀 Quick Start

### Prerequisites
- Node.js 20+
- PostgreSQL 16+
- Redis 7+

### Backend Setup
```bash
cd backend
npm install
cp .env.example .env   # Edit with your credentials
npx prisma generate
npx prisma db push
npx tsx src/seed.ts    # Seed sample data
npm run dev            # Start on http://localhost:5000
```

### Frontend Setup
```bash
cd frontend
npm install
cp .env.example .env.local
npm run dev            # Start on http://localhost:3000
```

### Docker Setup (Production)
```bash
docker-compose up -d
```

## 🏗 Architecture

```
ac-repair-service/
├── backend/
│   ├── prisma/           # Schema & migrations
│   ├── src/
│   │   ├── config/       # DB, Redis, logger
│   │   ├── controllers/  # Route handlers
│   │   ├── middleware/    # Auth, validation, upload
│   │   ├── routes/       # API endpoints
│   │   ├── services/     # Business logic
│   │   ├── validators/   # Zod schemas
│   │   └── server.ts     # Express entry
│   └── Dockerfile
├── frontend/
│   ├── src/
│   │   ├── app/          # Next.js App Router pages
│   │   ├── components/   # Reusable UI components
│   │   ├── lib/          # Utils, API client, data
│   │   └── styles/       # Global CSS
│   └── Dockerfile
├── docker-compose.yml
├── .gitignore
└── README.md
```

## 🎨 Design System

| Token        | Value     | Usage                     |
|-------------|-----------|---------------------------|
| Primary     | #007BFF   | Buttons, links, accents   |
| Secondary   | #00C2FF   | Highlights, gradients     |
| Accent      | #16C47F   | Success, trust signals    |
| Background  | White     | Light mode                |
| Dark BG     | #0A0F1E   | Dark mode                 |

- **Typography**: Inter (body), Poppins (headings), Manrope (display)
- **Animations**: Framer Motion + GSAP
- **Components**: Shadcn UI + custom glassmorphism

## 📋 Core Features

### Customer
- View services & pricing
- Book AC repair in 30 seconds
- Track booking in real-time
- OTP-based login
- Dashboard with booking history
- Review & rate technicians
- Download invoices

### Admin
- Dashboard with analytics
- Manage bookings & customers
- Add/edit services & pricing
- Create coupons & promotions
- View revenue reports
- Manage technicians

### Technician
- View assigned jobs
- Update booking status
- Upload before/after images
- Generate invoices
- Track earnings

## 🔌 API Endpoints

### Auth
```
POST   /api/v1/auth/send-otp        # Send OTP to phone
POST   /api/v1/auth/verify-otp      # Verify & login
POST   /api/v1/auth/refresh         # Refresh token
POST   /api/v1/auth/logout          # Logout
GET    /api/v1/auth/profile         # Get profile
PATCH  /api/v1/auth/profile         # Update profile
```

### Services
```
GET    /api/v1/services             # List services
GET    /api/v1/services/:slug       # Get service by slug
GET    /api/v1/services/categories  # List categories
```

### Bookings
```
POST   /api/v1/bookings             # Create booking
GET    /api/v1/bookings             # Get my bookings
GET    /api/v1/bookings/:id         # Get booking details
POST   /api/v1/bookings/:id/cancel  # Cancel booking
PUT    /api/v1/bookings/:id/status  # Update status
POST   /api/v1/bookings/review      # Add review
```

### Admin
```
GET    /api/v1/admin/dashboard      # Dashboard stats
GET    /api/v1/admin/bookings       # All bookings
GET    /api/v1/admin/customers      # All customers
GET    /api/v1/admin/technicians    # All technicians
GET    /api/v1/admin/revenue        # Revenue data
```

### Public
```
GET    /api/v1/blogs                # List blogs
GET    /api/v1/faqs                 # List FAQs
GET    /api/v1/reviews              # Public reviews
GET    /api/v1/cities               # Service cities
GET    /api/v1/check-pincode/:code  # Check availability
```

## 🗄 Database Models

- **User** - Customers, Technicians, Admins
- **ServiceCategory** - Service groupings
- **Service** - Individual services with pricing
- **Booking** - Service bookings with full status tracking
- **Review** - Customer reviews linked to bookings
- **Invoice** - GST-compatible invoices
- **Payment** - Razorpay payment records
- **Coupon** - Discount coupons
- **City, Area, Pincode** - Service coverage
- **Blog** - SEO-optimized articles
- **FAQ** - Frequently asked questions
- **Notification** - User notifications
- **SupportTicket** - Customer support
- **AuditLog** - Activity tracking
- **Inventory, SparePart** - Parts management
- **AMC** - Annual maintenance contracts

## 🔐 Security

- JWT + Refresh Token authentication
- HTTP-only cookies for tokens
- Helmet security headers
- Rate limiting on auth routes
- Input validation with Zod
- SQL injection protection (Prisma)
- Role-based access control
- XSS protection

## 📈 SEO

- Dynamic metadata per page
- JSON-LD structured data (LocalBusiness, FAQ)
- OpenGraph & Twitter cards
- Auto-generated sitemap.xml
- robots.txt configuration
- Schema.org LocalBusiness markup
- Optimized Core Web Vitals

## 🚀 Deployment

### Production URL: https://coolfixpro.com
### API URL: https://api.coolfixpro.com

### Environment Variables (Required)
```
DATABASE_URL=postgresql://...
JWT_SECRET=your-secret
JWT_REFRESH_SECRET=your-refresh-secret
REDIS_URL=redis://...
RAZORPAY_KEY_ID=your-key
RAZORPAY_KEY_SECRET=your-secret
CLOUDINARY_URL=cloudinary://...
RESEND_API_KEY=your-key
```

## 📄 License

MIT License - see LICENSE file