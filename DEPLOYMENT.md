# Deployment Guide for rajrsoftware.com

## 🚀 Vercel Deployment (Recommended)

### Step 1: Prepare Your Repository
1. **Push to GitHub** (if not already done):
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

### Step 2: Deploy to Vercel
1. **Sign up/Login to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Sign up with GitHub account

2. **Import Your Project**:
   - Click "New Project"
   - Select your `rajr-software-website` repository
   - Vercel will auto-detect Next.js settings

3. **Configure Environment Variables**:
   - In project settings, add:
     ```
     RESEND_API_KEY=your_resend_api_key_here
     ```

4. **Deploy**:
   - Click "Deploy"
   - Vercel will build and deploy automatically
   - You'll get a temporary URL like `rajr-software-website.vercel.app`

### Step 3: Connect Custom Domain
1. **In Vercel Dashboard**:
   - Go to Project Settings → Domains
   - Add `rajrsoftware.com` and `www.rajrsoftware.com`

2. **Update DNS Records**:
   - **If using Vercel DNS (Recommended)**:
     - Vercel will provide nameservers
     - Update your domain registrar to use Vercel nameservers
   
   - **If keeping current DNS provider**:
     - Add these DNS records:
     ```
     A record:     rajrsoftware.com     →  76.76.19.19
     CNAME record: www.rajrsoftware.com →  cname.vercel-dns.com
     ```

### Step 4: Email Domain Verification (Resend)
Since your contact form uses Resend, you'll need to verify your domain:

1. **In Resend Dashboard**:
   - Go to Domains → Add Domain
   - Enter `rajrsoftware.com`
   - Add the provided DNS records

2. **Update Contact Form**:
   - Once domain is verified, update the `from` address in `app/actions/contact.tsx`:
     ```typescript
     from: 'RAJR Software Contact <contact@rajrsoftware.com>'
     ```

---

## 🏗️ Alternative: Traditional Hosting

If you prefer using traditional hosting (cPanel, VPS, etc.):

### Step 1: Build for Production
```bash
npm run build
npm run start
```

### Step 2: Export Static Version (if needed)
Add to `next.config.mjs`:
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true }
}

export default nextConfig
```

Then build:
```bash
npm run build
```

Upload the `out` folder contents to your hosting provider.

**Note**: Static export won't work with the contact form server actions. You'd need to convert to a different approach (like API routes with a Node.js hosting solution).

---

## 🔧 Pre-Deployment Checklist

### 1. Environment Variables
- [ ] `RESEND_API_KEY` is set in deployment environment
- [ ] Test email functionality works

### 2. Domain & Email Setup
- [ ] Domain DNS is configured
- [ ] SSL certificate is active (automatic with Vercel)
- [ ] Email domain is verified in Resend
- [ ] Contact form sends to correct email address

### 3. Testing
- [ ] Build succeeds locally: `npm run build`
- [ ] Contact form works in production
- [ ] All pages load correctly
- [ ] Mobile responsiveness works

### 4. Security
- [ ] Environment variables are secure
- [ ] Rate limiting is working
- [ ] Spam detection is active

---

## 🚨 Important Notes

### Contact Form Considerations
- **Server Actions**: Your contact form uses Next.js server actions
- **Hosting Requirements**: Requires Node.js hosting (Vercel, Netlify, VPS)
- **Static Export**: Won't work with current contact form implementation

### Domain Email Setup
1. **Verify rajrsoftware.com in Resend** before going live
2. **Update from address** once domain is verified
3. **Test email delivery** after domain verification

---

## 📞 Quick Start Commands

```bash
# Test build locally
npm run build
npm run start

# Check for errors
npm run lint

# Deploy to Vercel (after connecting repository)
git push origin main  # Auto-deploys on Vercel
```

---

## 🎯 Recommended Timeline

1. **Day 1**: Set up Vercel account, deploy with temporary domain
2. **Day 2**: Configure custom domain DNS
3. **Day 3**: Verify email domain in Resend, update contact form
4. **Day 4**: Final testing and go live

This approach ensures minimal downtime and a smooth transition to your custom domain.