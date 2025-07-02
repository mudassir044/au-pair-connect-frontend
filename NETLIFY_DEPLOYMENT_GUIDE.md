# Netlify + Render Deployment Guide

## Problem Identified
Your backend at `https://au-pair.onrender.com` is returning CORS errors because it's not configured to allow requests from Netlify domains.

## EXACT Solution for Your Backend

### 1. Update Your Backend CORS Configuration
In your `backend/src/index.ts` file, update the CORS configuration to include Netlify domains:

```typescript
import cors from 'cors';

// Update your CORS middleware
const corsOptions = {
  origin: [
    'https://your-app-name.netlify.app',  // Replace with your actual Netlify URL
    'https://deploy-preview-*--your-app-name.netlify.app', // For preview deployments
    'http://localhost:5173', // Local development (Vite)
    'http://localhost:3000', // Local development (alternative)
    'http://localhost:5000', // Local development (current setup)
    /^https:\/\/deploy-preview-\d+--your-app-name\.netlify\.app$/, // Regex for preview deployments
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
```

### 2. Alternative Dynamic CORS Configuration
If you want to allow all Netlify subdomains dynamically, use this approach:

```typescript
const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, curl, postman)
    if (!origin) return callback(null, true);
    
    const allowedOrigins = [
      'http://localhost:5173',
      'http://localhost:3000', 
      'http://localhost:5000',
    ];
    
    // Allow all Netlify domains
    if (origin.includes('.netlify.app') || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
```

### 2. Netlify Environment Variables
In your Netlify dashboard, go to Site settings > Environment variables and add:
- `VITE_API_BASE_URL` = `https://au-pair.onrender.com`

### 3. Build Configuration
The `netlify.toml` file has been created with optimal settings:
- Build directory: `client`
- Publish directory: `dist`
- Build command: `npm run build`
- SPA redirects configured

### 4. Files Created for Netlify Optimization
- `netlify.toml` - Build and deployment configuration
- `client/public/_redirects` - SPA routing support
- `client/.env.example` - Environment variables documentation

### 5. Deployment Steps
1. Push your code to GitHub/GitLab
2. Connect your repository to Netlify
3. Set the environment variable `VITE_API_BASE_URL`
4. Deploy

### 6. Test Your Deployment
Once deployed, test these endpoints:
- Landing page loads correctly
- Registration/login attempts (should show specific CORS errors if backend isn't updated)
- Navigation between pages works

## Next Steps
1. Update your Render backend CORS configuration with your Netlify URL
2. Deploy to Netlify using the provided configuration
3. Test the connection between frontend and backend

## Troubleshooting
If you still get CORS errors after deployment:
1. Check your Netlify URL (e.g., `https://your-app-name.netlify.app`)
2. Add that exact URL to your backend's CORS allowed origins
3. Redeploy your backend on Render
4. Clear browser cache and test again