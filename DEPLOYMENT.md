# 🚀 Deployment Guide

## She Can Foundation - Deployment Instructions

This guide covers deploying both the frontend and backend applications to production.

---

## 📋 Prerequisites

- GitHub account
- Vercel/Netlify account (frontend)
- Render/Railway account (backend)
- MongoDB Atlas account (database)
- Node.js 18+ installed locally

---

## 🎨 Frontend Deployment (Vercel)

### Step 1: Push to GitHub

```bash
# Initialize git repository
git init
git add .
git commit -m "Initial commit"

# Create GitHub repository and push
git remote add origin https://github.com/yourusername/she-can-foundation.git
git push -u origin main
```

### Step 2: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "New Project"
3. Import your GitHub repository
4. Configure:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
5. Click "Deploy"

### Step 3: Set Environment Variables

In Vercel Dashboard → Settings → Environment Variables:

```
VITE_API_URL=https://your-backend-url.onrender.com/api
```

---

## ⚙️ Backend Deployment (Render)

### Step 1: Set up MongoDB Atlas

1. Go to [mongodb.com](https://mongodb.com)
2. Create free account and cluster
3. Get connection string:
   ```
   mongodb+srv://<username>:<password>@cluster0.mongodb.net/shecan_foundation
   ```

### Step 2: Deploy to Render

1. Go to [render.com](https://render.com) and sign in
2. Click "New Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name:** she-can-api
   - **Runtime:** Node
   - **Build Command:** `cd backend && npm install`
   - **Start Command:** `cd backend && node server.js`
5. Add Environment Variables:

```
NODE_ENV=production
PORT=10000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/shecan_foundation
JWT_SECRET=your_secure_random_string_here
CLIENT_URL=https://your-frontend-url.vercel.app
```

6. Click "Create Web Service"

### Step 3: Seed Admin User

```bash
# Connect to your deployed backend
curl -X POST https://your-backend-url.onrender.com/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@shecan.org",
    "password": "admin123",
    "name": "Admin"
  }'
```

---

## 🗄️ Alternative: Railway Deployment

### Backend on Railway

1. Go to [railway.app](https://railway.app)
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your repository
4. Add MongoDB service (or use external Atlas)
5. Set environment variables (same as Render)
6. Railway auto-deploys

---

## 🔧 Alternative: Netlify (Frontend)

### Step 1: Build Settings

In Netlify Dashboard:
- **Build command:** `npm run build`
- **Publish directory:** `dist`

### Step 2: Redirect Rules

Create `public/_redirects`:
```
/*    /index.html   200
```

### Step 3: Environment Variables

```
VITE_API_URL=https://your-backend-url.onrender.com/api
```

---

## 🌐 Custom Domain Setup

### Vercel
1. Go to Project → Settings → Domains
2. Add your domain
3. Update DNS records as shown

### Render
1. Go to Service → Settings → Custom Domains
2. Add domain
3. Configure DNS

---

## 🔒 Production Checklist

### Security
- [ ] JWT_SECRET is a strong, unique string
- [ ] MongoDB password is secure
- [ ] CORS is configured for your domain only
- [ ] Environment variables are not exposed

### Performance
- [ ] Frontend is built and optimized
- [ ] Backend is running in production mode
- [ ] MongoDB indexes are created

### Monitoring
- [ ] Set up error logging
- [ ] Monitor API response times
- [ ] Track database usage

---

## 🐛 Troubleshooting

### CORS Errors
Ensure `CLIENT_URL` environment variable matches your frontend URL exactly.

### Database Connection Failed
- Check MongoDB Atlas IP whitelist
- Verify connection string format
- Ensure database user has proper permissions

### Build Failures
- Check Node.js version (18+ required)
- Verify all dependencies are installed
- Check for TypeScript errors

---

## 📊 Monitoring URLs

After deployment, test these endpoints:

```
Health Check: https://your-backend.onrender.com/api/health
Contact API: https://your-backend.onrender.com/api/contact
Auth API: https://your-backend.onrender.com/api/auth/login
Frontend: https://your-frontend.vercel.app
```

---

## 🔄 Continuous Deployment

Both Vercel and Render automatically deploy when you push to GitHub main branch.

To deploy manually:
```bash
git add .
git commit -m "Your update"
git push origin main
```

---

## 📞 Support

If you encounter issues:
1. Check the logs in your hosting dashboard
2. Verify environment variables
3. Test locally first
4. Contact support if needed

---

**Happy Deploying! 🎉**
