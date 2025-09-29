"use server"

import { Resend } from 'resend'
import { z } from 'zod'

// Validation schema with security rules
const ContactFormSchema = z.object({
  name: z.string()
    .min(1, 'Name is required')
    .max(100, 'Name must be less than 100 characters')
    .regex(/^[a-zA-Z\s\-\.\'\']+$/, 'Name contains invalid characters'),
  email: z.string()
    .min(1, 'Email is required')
    .max(255, 'Email must be less than 255 characters')
    .email('Invalid email format')
    .toLowerCase(),
  company: z.string()
    .max(100, 'Company name must be less than 100 characters')
    .regex(/^[a-zA-Z0-9\s\-\.\'\&\,]*$/, 'Company name contains invalid characters')
    .optional(),
  message: z.string()
    .min(10, 'Message must be at least 10 characters')
    .max(5000, 'Message must be less than 5000 characters')
})

type ContactFormData = z.infer<typeof ContactFormSchema>

// Rate limiting store (in production, use Redis or database)
const submissionStore = new Map<string, { count: number; lastSubmission: number }>()

const resend = new Resend(process.env.RESEND_API_KEY)

// Sanitization functions
function sanitizeHtml(text: string): string {
  return text
    .replace(/[<>"'&]/g, (match) => {
      const entities: { [key: string]: string } = {
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#x27;',
        '&': '&amp;'
      }
      return entities[match] || match
    })
}

function detectSpam(data: ContactFormData): { isSpam: boolean; reason?: string } {
  const spamKeywords = ['viagra', 'casino', 'lottery', 'winner', 'congratulations', 'click here', 'free money', 'make money fast']
  const suspiciousPatterns = [
    /http[s]?:\/\/[^\s]+/gi, // URLs
    /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g, // Multiple emails
    /\b\d{4}[\s-]?\d{4}[\s-]?\d{4}[\s-]?\d{4}\b/g, // Credit card patterns
  ]

  const fullText = `${data.name} ${data.company} ${data.message}`.toLowerCase()

  // Check for spam keywords
  for (const keyword of spamKeywords) {
    if (fullText.includes(keyword.toLowerCase())) {
      return { isSpam: true, reason: 'Contains spam keywords' }
    }
  }

  // Check for suspicious patterns
  const urlMatches = (data.message.match(suspiciousPatterns[0]) || []).length
  if (urlMatches > 2) {
    return { isSpam: true, reason: 'Too many URLs' }
  }

  // Check for excessive repeated characters
  if (/([a-zA-Z])\1{10,}/.test(fullText)) {
    return { isSpam: true, reason: 'Excessive repeated characters' }
  }

  return { isSpam: false }
}

function checkRateLimit(clientId: string): { allowed: boolean; resetTime?: number } {
  const now = Date.now()
  const windowMs = 15 * 60 * 1000 // 15 minutes
  const maxSubmissions = 3

  const clientData = submissionStore.get(clientId)
  if (!clientData) {
    submissionStore.set(clientId, { count: 1, lastSubmission: now })
    return { allowed: true }
  }

  // Reset if window has passed
  if (now - clientData.lastSubmission > windowMs) {
    submissionStore.set(clientId, { count: 1, lastSubmission: now })
    return { allowed: true }
  }

  // Check if limit exceeded
  if (clientData.count >= maxSubmissions) {
    const resetTime = clientData.lastSubmission + windowMs
    return { allowed: false, resetTime }
  }

  // Increment count
  submissionStore.set(clientId, { count: clientData.count + 1, lastSubmission: now })
  return { allowed: true }
}

export async function sendContactEmail(rawData: ContactFormData) {
  try {
    // Validate required environment variables
    if (!process.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY is not configured")
      return { success: false, error: "Email service not configured" }
    }

    // Validate and sanitize input data
    const validationResult = ContactFormSchema.safeParse(rawData)
    if (!validationResult.success) {
      console.warn("Invalid form data:", validationResult.error.errors)
      return { 
        success: false, 
        error: "Invalid form data",
        details: validationResult.error.errors[0]?.message || "Validation failed"
      }
    }

    const data = validationResult.data

    // Create client identifier for rate limiting (in production, use IP address)
    const clientId = data.email.toLowerCase()

    // Check rate limiting
    const rateLimitCheck = checkRateLimit(clientId)
    if (!rateLimitCheck.allowed) {
      const resetTime = rateLimitCheck.resetTime ? new Date(rateLimitCheck.resetTime) : null
      console.warn(`Rate limit exceeded for ${clientId}`)
      return {
        success: false,
        error: "Too many submissions. Please try again later.",
        resetTime: resetTime?.toISOString()
      }
    }

    // Spam detection
    const spamCheck = detectSpam(data)
    if (spamCheck.isSpam) {
      console.warn(`Spam detected from ${clientId}: ${spamCheck.reason}`)
      // Return success to avoid revealing spam detection to malicious users
      return { success: true }
    }

    // Sanitize data for email
    const sanitizedData = {
      name: sanitizeHtml(data.name.trim()),
      email: data.email.trim(),
      company: data.company ? sanitizeHtml(data.company.trim()) : '',
      message: sanitizeHtml(data.message.trim())
    }

    // Log the submission (for debugging)
    console.log("Contact form submission:", {
      name: sanitizedData.name,
      email: sanitizedData.email,
      company: sanitizedData.company,
      timestamp: new Date().toISOString(),
    })

    // Send email using Resend
    const { data: emailData, error } = await resend.emails.send({
      from: 'jolie_rabideau@rajrsoftware.com',
      to: ['hello@rajrsoftware.com'],
      replyTo: sanitizedData.email,
      subject: `New Contact Form Submission from ${sanitizedData.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
            🔒 New Contact Form Submission
          </h2>
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 10px 0;"><strong>Name:</strong> ${sanitizedData.name}</p>
            <p style="margin: 10px 0;"><strong>Email:</strong> 
              <a href="mailto:${sanitizedData.email}" style="color: #007bff;">${sanitizedData.email}</a>
            </p>
            <p style="margin: 10px 0;"><strong>Company:</strong> ${sanitizedData.company || 'Not provided'}</p>
          </div>
          
          <div style="margin: 20px 0;">
            <p style="margin: 10px 0;"><strong>Project Details:</strong></p>
            <div style="background: #ffffff; border: 1px solid #dee2e6; padding: 15px; border-radius: 8px;">
              ${sanitizedData.message.replace(/\n/g, '<br>')}
            </div>
          </div>
          
          <hr style="border: 1px solid #dee2e6; margin: 20px 0;">
          <p style="color: #6c757d; font-size: 14px;">
            <strong>Submitted:</strong> ${new Date().toLocaleString('en-US', {
              timeZone: 'America/New_York',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })} EST
          </p>
          <p style="color: #6c757d; font-size: 12px;">
            ✅ This email was securely processed and sent from the RAJR Software contact form<br>
            🛡️ All input has been validated and sanitized for security
          </p>
        </div>
      `,
    })

    if (error) {
      console.error("Resend API error:", error)
      return { success: false, error: "Failed to send email" }
    }

    console.log("Email sent successfully:", emailData?.id)
    return { success: true, messageId: emailData?.id }

  } catch (error) {
    console.error("Error sending contact email:", error)
    return { success: false, error: "Failed to send email" }
  }
}