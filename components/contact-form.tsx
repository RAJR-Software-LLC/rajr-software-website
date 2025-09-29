"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Mail, Send, CheckCircle, AlertCircle, Shield } from "lucide-react"
import { sendContactEmail } from "@/app/actions/contact"

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error" | "rate-limited">("idle")
  const [errorMessage, setErrorMessage] = useState<string>("")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  })
  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({})

  // Client-side validation
  const validateField = (name: string, value: string): string => {
    switch (name) {
      case 'name':
        if (!value.trim()) return 'Name is required'
        if (value.length > 100) return 'Name must be less than 100 characters'
        if (!/^[a-zA-Z\s\-\.\'\']+$/.test(value)) return 'Name contains invalid characters'
        return ''
      case 'email':
        if (!value.trim()) return 'Email is required'
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Invalid email format'
        return ''
      case 'company':
        if (value.length > 100) return 'Company name must be less than 100 characters'
        if (value && !/^[a-zA-Z0-9\s\-\.\'\'\&\,]*$/.test(value)) return 'Company name contains invalid characters'
        return ''
      case 'message':
        if (!value.trim()) return 'Message is required'
        if (value.length < 10) return 'Message must be at least 10 characters'
        if (value.length > 5000) return 'Message must be less than 5000 characters'
        return ''
      default:
        return ''
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")
    setErrorMessage("")
    setFieldErrors({})

    // Client-side validation
    const errors: { [key: string]: string } = {}
    Object.entries(formData).forEach(([key, value]) => {
      const error = validateField(key, value)
      if (error) errors[key] = error
    })

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors)
      setIsSubmitting(false)
      return
    }

    try {
      const result = await sendContactEmail(formData)
      if (result.success) {
        setSubmitStatus("success")
        setFormData({ name: "", email: "", company: "", message: "" })
      } else {
        if (result.error?.includes("Too many submissions")) {
          setSubmitStatus("rate-limited")
          setErrorMessage(result.error)
        } else {
          setSubmitStatus("error")
          setErrorMessage(result.details || result.error || "Failed to send message")
        }
      }
    } catch (error) {
      console.error("Contact form error:", error)
      setSubmitStatus("error")
      setErrorMessage("Network error. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    
    // Clear field error when user starts typing
    if (fieldErrors[name]) {
      setFieldErrors(prev => ({ ...prev, [name]: '' }))
    }
    
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  return (
    <Card className="p-8 max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Mail className="w-8 h-8 text-primary" />
        </div>
        <h3 className="text-2xl font-bold mb-2">Get In Touch</h3>
        <p className="text-muted-foreground">
          Ready to discuss your project? Send us a message and we&apos;ll get back to you within 24 hours.
        </p>
        <div className="flex items-center justify-center space-x-2 mt-4 text-sm text-muted-foreground">
          <Shield className="w-4 h-4" />
          <span>Secure & spam-protected</span>
        </div>
      </div>

      {submitStatus === "success" && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center space-x-3">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <p className="text-green-800">Thank you! Your message has been sent successfully. We&apos;ll be in touch soon.</p>
        </div>
      )}

      {submitStatus === "rate-limited" && (
        <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg flex items-center space-x-3">
          <AlertCircle className="w-5 h-5 text-yellow-600" />
          <div>
            <p className="text-yellow-800 font-medium">Rate limit reached</p>
            <p className="text-yellow-700 text-sm">{errorMessage}</p>
          </div>
        </div>
      )}

      {submitStatus === "error" && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-3">
          <AlertCircle className="w-5 h-5 text-red-600" />
          <div>
            <p className="text-red-800">Sorry, there was an error sending your message.</p>
            {errorMessage && <p className="text-red-700 text-sm">{errorMessage}</p>}
            <p className="text-red-700 text-sm">Please try again or email us directly.</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name *</Label>
            <Input
              id="name"
              name="name"
              type="text"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              disabled={isSubmitting}
              className={fieldErrors.name ? "border-red-500" : ""}
              maxLength={100}
            />
            {fieldErrors.name && (
              <p className="text-sm text-red-600">{fieldErrors.name}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email Address *</Label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="john@company.com"
              disabled={isSubmitting}
              className={fieldErrors.email ? "border-red-500" : ""}
              maxLength={255}
            />
            {fieldErrors.email && (
              <p className="text-sm text-red-600">{fieldErrors.email}</p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="company">Company/Organization</Label>
          <Input
            id="company"
            name="company"
            type="text"
            value={formData.company}
            onChange={handleChange}
            placeholder="Your Company Name"
            disabled={isSubmitting}
            className={fieldErrors.company ? "border-red-500" : ""}
            maxLength={100}
          />
          {fieldErrors.company && (
            <p className="text-sm text-red-600">{fieldErrors.company}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="message">Project Details *</Label>
          <Textarea
            id="message"
            name="message"
            required
            value={formData.message}
            onChange={handleChange}
            placeholder="Tell us about your project, timeline, and any specific requirements..."
            className={`min-h-[120px] ${fieldErrors.message ? "border-red-500" : ""}`}
            disabled={isSubmitting}
            maxLength={5000}
          />
          <div className="flex justify-between items-center">
            {fieldErrors.message ? (
              <p className="text-sm text-red-600">{fieldErrors.message}</p>
            ) : (
              <div></div>
            )}
            <p className="text-xs text-muted-foreground">
              {formData.message.length}/5000 characters
            </p>
          </div>
        </div>

        <Button 
          type="submit" 
          size="lg" 
          className="w-full bg-primary hover:bg-primary/90" 
          disabled={isSubmitting || submitStatus === "rate-limited"}
        >
          {isSubmitting ? (
            <>
              <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin mr-2" />
              Sending Message...
            </>
          ) : (
            <>
              <Send className="w-5 h-5 mr-2" />
              Send Secure Message
            </>
          )}
        </Button>
      </form>

      <div className="mt-6 pt-6 border-t border-border text-center">
        <p className="text-sm text-muted-foreground">
          Or email us directly at{" "}
          <a href="mailto:hello@rajrsoftware.com" className="text-primary hover:underline font-medium">
            hello@rajrsoftware.com
          </a>
        </p>
        <div className="flex items-center justify-center space-x-4 mt-3 text-xs text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Shield className="w-3 h-3" />
            <span>Spam filtered</span>
          </div>
          <div className="flex items-center space-x-1">
            <CheckCircle className="w-3 h-3" />
            <span>Input validated</span>
          </div>
        </div>
      </div>
    </Card>
  )
}