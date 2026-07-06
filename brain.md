# AC Repair & Home Appliance Service Platform

## Project Overview
A production-ready, premium AC Repair & Home Appliance Service website for Indian customers. Similar to Urban Company but specialized for AC & appliance repair services.

## Technology Stack
- **Frontend**: Next.js 16, React, TypeScript, Tailwind CSS, Framer Motion, GSAP, Shadcn UI
- **Backend**: Node.js, Express.js, TypeScript, REST API, JWT Auth
- **Database**: PostgreSQL, Prisma ORM
- **Cache**: Redis
- **Media**: Cloudinary
- **Email**: Resend
- **SMS**: Twilio/MSG91
- **Payments**: Razorpay
- **Maps**: Google Maps API

## Architecture
- Monorepo with `backend/` and `frontend/` directories
- Backend: Express.js REST API with Prisma ORM
- Frontend: Next.js 16 App Router with SSR/ISR
- Auth: JWT + Refresh Tokens + Secure Cookies
- Role-Based Access: Customer, Technician, Admin

## Design System
- **Colors**: Primary #007BFF, Secondary #00C2FF, Accent #16C47F
- **Background**: White + Glassmorphism + Soft Shadows
- **Dark Mode**: Full support
- **Typography**: Poppins, Inter, Manrope
- **Animations**: Framer Motion + GSAP for premium feel

## Key Business Rules
- Users can book services in 30 seconds
- OTP verification required for booking
- Services: Split AC, Window AC, Installation, Gas Filling, Deep Cleaning, etc.
- Booking status flow: Pending -> Confirmed -> Assigned -> OnTheWay -> Working -> Completed
- 30-day service warranty on all repairs
- Emergency booking available 24/7
- AMC subscription model supported
- Multi-language: Hindi & English

## Database Models
- User (Customer, Admin, Technician roles)
- Service, ServiceCategory
- Booking with full status tracking
- Review (linked to booking)
- Invoice (GST-compatible)
- Payment (Razorpay integration)
- Coupon, Referral
- City, Area, Pincode
- Blog, FAQ
- Notification, AuditLog
- Inventory, SparePart

## API Design
- RESTful endpoints under /api/v1/
- Protected routes with JWT middleware
- Rate limiting on auth and booking endpoints
- Pagination on list endpoints
- File upload via multer -> Cloudinary

## UI/UX Principles
- Premium, luxurious, modern feel
- Frictionless booking flow
- Trust signals throughout (ratings, warranties, certifications)
- Responsive: Mobile-first, Indian audience optimized
- Smooth animations and transitions
- Large touch targets for mobile users
- Clear pricing always visible

## SEO Strategy
- Dynamic metadata per page
- FAQ Schema, LocalBusiness Schema
- Breadcrumb structured data
- Sitemap.xml + robots.txt
- Optimized Core Web Vitals
- Lazy loading images

## Performance Targets
- Lighthouse score > 90
- First Contentful Paint < 1.5s
- Time to Interactive < 3s
- All images optimized and lazy-loaded
- Code splitting on all routes
- Redis caching on API responses