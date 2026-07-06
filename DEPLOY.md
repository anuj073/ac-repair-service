# CoolFix Pro - AC Repair Service Platform

## 🚀 Deployment Guide (₹0/month)

### Architecture

| Component      | Platform            | Cost     |
|---------------|---------------------|----------|
| Frontend      | Vercel              | Free     |
| Backend       | Render              | Free     |
| Database      | Neon PostgreSQL     | Free     |
| Cache         | Upstash Redis       | Free     |
| Images        | Cloudinary          | Free     |

---

### 1. Database — Neon (PostgreSQL)

1. Go to https://console.neon.tech → Sign up (GitHub)
2. Create a project → Get your connection string:
   ```
   postgresql://user:password@ep-xxxx.us-east-2.aws.neon.tech/ac_repair_db?sslmode=require
   ```
3. Save this as `DATABASE_URL` in Render environment variables

### 2. Cache — Upstash (Redis)

1. Go to https://console.upstash.com → Sign up
2. Create a Redis database → Get your connection string:
   ```
   rediss://default:password@xxxx.upstash.io:6379
   ```
3. Save this as `REDIS_URL`

### 3. Images — Cloudinary

1. Go to https://cloudinary.com → Sign up
2. Dashboard → Get Cloud name, API Key, API Secret
3. Save as `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`

### 4. Backend — Render

1. Go to https://dashboard.render.com → New Web Service
2. Connect your GitHub repo → Select `backend/` as root directory
3. Settings:
   - **Name**: `ac-repair-api`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `./start.sh`
   - **Instance Type**: Free
4. Add Environment Variables:
   ```
   NODE_ENV=production
   PORT=5000
   FRONTEND_URL=https://your-frontend.vercel.app
   DATABASE_URL=<from Neon>
   REDIS_URL=<from Upstash>
   JWT_SECRET=<random-string>
   JWT_REFRESH_SECRET=<random-string>
   CLOUDINARY_CLOUD_NAME=<from Cloudinary>
   CLOUDINARY_API_KEY=<from Cloudinary>
   CLOUDINARY_API_SECRET=<from Cloudinary>
   RESEND_API_KEY=<if using email>
   RAZORPAY_KEY_ID=<if using payments>
   RAZORPAY_KEY_SECRET=<if using payments>
   ```
5. Deploy → Note your backend URL: `https://ac-repair-api.onrender.com`

### 5. Frontend — Vercel

1. Go to https://vercel.com → Add New Project
2. Import your GitHub repo → Keep **root** as the project directory
3. **Override settings**:
   - **Framework**: Next.js
   - **Root Directory**: `frontend/`
   - **Build Command**: `npx prisma generate && next build`
   - **Install Command**: `npm install`
4. Add Environment Variables:
   ```
   NEXT_PUBLIC_API_URL=https://ac-repair-api.onrender.com/api/v1
   NEXT_PUBLIC_SITE_URL=https://ac-repair.vercel.app
   ```
5. Deploy → Your site at `https://ac-repair.vercel.app`

### 6. Seed the Database

After the backend deploys, seed sample data:
```bash
curl -X POST https://ac-repair-api.onrender.com/api/v1/admin/seed
```

---

## Local Development

```bash
# Backend
cd backend
cp .env.example .env    # Edit with your credentials
npm install
npx prisma generate
npx prisma db push
npx tsx src/seed.ts
npm run dev              # http://localhost:5000

# Frontend
cd frontend
cp .env.example .env.local
npm install
npm run dev              # http://localhost:3000
```

## E2E Testing

```bash
# Install browsers (one-time)
npx playwright install chromium

# Run all E2E tests
npm run test:e2e

# With UI mode
npm run test:e2e:ui
```