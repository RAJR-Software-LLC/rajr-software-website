# Email Service Setup Instructions

## Setting up Resend for Contact Form

1. **Sign up for Resend** (Free tier includes 100 emails/day)
   - Go to [https://resend.com](https://resend.com)
   - Create a free account

2. **Get your API Key**
   - After signing up, go to [API Keys](https://resend.com/api-keys)
   - Click "Create API Key"
   - Give it a name like "RAJR Software Website"
   - Copy the generated API key

3. **Configure Environment Variables**
   - Open the `.env.local` file in your project root
   - Replace `your_resend_api_key_here` with your actual API key:
     ```
     RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxx
     ```

4. **Restart your development server**
   ```bash
   npm run dev
   ```

## ⚠️ Important: Domain Verification Required

**Current Status**: The contact form is temporarily sending emails to `jolie_rabideau@rajrsoftware.com` because Resend requires domain verification to send to external addresses.

**To send emails to `hello@rajrsoftware.com`:**

1. **Verify your domain** in Resend:
   - Go to [Domains](https://resend.com/domains) in your Resend dashboard
   - Click "Add Domain"
   - Enter `rajrsoftware.com`
   - Follow the DNS verification steps (add TXT and MX records)

2. **Update the from address** once domain is verified:
   - In `app/actions/contact.tsx`, change:
     ```tsx
     from: 'RAJR Software Contact Form <onboarding@resend.dev>'
     ```
   - To:
     ```tsx
     from: 'RAJR Software Contact Form <contact@rajrsoftware.com>'
     ```

3. **Update the to address**:
   - Change `to: ['jolie_rabideau@rajrsoftware.com']`
   - Back to `to: ['hello@rajrsoftware.com']`

## Testing Mode Limitations

- **Without domain verification**: Can only send to your account's verified email address
- **With domain verification**: Can send to any email address using your verified domain

## Important Notes

- **Free Tier Limits**: Resend's free tier includes 100 emails per day and 3,000 emails per month
- **From Address**: Currently using Resend's default domain (`onboarding@resend.dev`). To use your own domain:
  - Add and verify your domain in Resend dashboard
  - Update the `from` field in `app/actions/contact.tsx`
- **Reply-To**: The form sets the reply-to address as the form submitter's email for easy responses

## Testing

1. Fill out the contact form on your website
2. Check the console logs for success/error messages
3. Check your email at hello@rajrsoftware.com

## Troubleshooting

- **"Email service not configured"**: Make sure `RESEND_API_KEY` is set in `.env.local`
- **API errors**: Check the console logs for specific error messages
- **Emails not received**: Check spam folder, verify API key is correct

## Alternative Free Email Services

If you prefer other services:

- **EmailJS**: Client-side email sending (no server required)
- **Formspree**: Form handling service with email notifications
- **Netlify Forms**: If hosting on Netlify
- **Vercel Forms**: If deploying on Vercel