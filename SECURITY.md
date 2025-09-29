# Contact Form Security Implementation

## 🛡️ Security Measures Implemented

### 1. Input Validation & Sanitization
- **Zod Schema Validation**: Server-side validation with strict rules
- **HTML Sanitization**: All user input is sanitized to prevent XSS attacks
- **Character Limits**: Enforced on all fields to prevent buffer overflow
- **Regex Validation**: Names and company fields only allow safe characters

### 2. Spam Detection
- **Keyword Filtering**: Detects common spam keywords (viagra, casino, lottery, etc.)
- **URL Pattern Detection**: Flags messages with excessive URLs (>2)
- **Repeated Character Detection**: Identifies spam with excessive repeated chars
- **Silent Rejection**: Returns success to avoid revealing detection to spammers

### 3. Rate Limiting
- **15-minute windows**: Maximum 3 submissions per 15 minutes per email
- **Memory-based storage**: Uses Map for rate limiting (upgrade to Redis for production)
- **Graceful handling**: Clear error messages with reset time information

### 4. Client-Side Protection
- **Real-time validation**: Immediate feedback on invalid input
- **Field-specific errors**: Clear error messages for each field
- **Character counters**: Visual feedback for message length
- **Disabled states**: Prevents multiple submissions and rate-limited attempts

### 5. Email Security
- **Template sanitization**: All variables in email template are sanitized
- **Security indicators**: Email includes validation status and security notes
- **Structured data**: Proper HTML formatting with security markers

## 🔍 Security Features

### Input Validation Rules
```typescript
name: 1-100 chars, letters/spaces/hyphens/periods/apostrophes only
email: Valid email format, max 255 chars, converted to lowercase
company: 0-100 chars, alphanumeric + common business chars only
message: 10-5000 chars, full sanitization applied
```

### Spam Detection Triggers
- Spam keywords: viagra, casino, lottery, winner, congratulations, etc.
- Multiple URLs (>2 in message)
- Excessive repeated characters (10+ in a row)
- Suspicious patterns (credit card numbers, excessive emails)

### Rate Limiting
- **Window**: 15 minutes
- **Limit**: 3 submissions per email address
- **Reset**: Automatic after window expires
- **Storage**: In-memory Map (upgrade to Redis for production scaling)

## 🚀 Production Recommendations

### 1. Database Storage
Replace in-memory rate limiting with database or Redis:
```typescript
// Example with Redis
const redis = new Redis(process.env.REDIS_URL)
const key = `rate_limit:${email}`
const current = await redis.incr(key)
if (current === 1) {
  await redis.expire(key, 900) // 15 minutes
}
```

### 2. IP-Based Rate Limiting
Add IP-based rate limiting using headers:
```typescript
const clientIp = request.headers.get('x-forwarded-for') || 'unknown'
```

### 3. CAPTCHA Integration
For additional protection, consider adding:
- reCAPTCHA v3 (invisible)
- hCaptcha
- Cloudflare Turnstile

### 4. Advanced Spam Detection
- Machine learning-based content analysis
- Reputation-based filtering
- Honeypot fields (hidden fields that bots fill)

### 5. Monitoring & Logging
- Log all blocked attempts
- Monitor submission patterns
- Set up alerts for unusual activity

## 🔧 Configuration

### Environment Variables
```bash
RESEND_API_KEY=your_api_key
REDIS_URL=your_redis_url (optional, for production)
```

### Security Settings
All security parameters are configurable in the code:
- Rate limit windows and thresholds
- Spam keyword lists
- Character limits
- Validation patterns

## 🧪 Testing Security

### Test Cases
1. **Valid Submission**: Normal form should work
2. **Invalid Characters**: Special chars should be blocked
3. **Long Inputs**: Exceed character limits
4. **Spam Content**: Include spam keywords
5. **Rate Limiting**: Submit multiple times rapidly
6. **XSS Attempts**: Try script injection
7. **Empty Fields**: Submit without required data

### Security Audit
- All user input is validated server-side
- HTML sanitization prevents XSS
- Rate limiting prevents abuse
- Spam detection reduces unwanted emails
- Error messages don't reveal system details

## 📊 Security Metrics

The implementation provides:
- ✅ XSS Prevention
- ✅ Injection Attack Prevention  
- ✅ Rate Limiting
- ✅ Spam Detection
- ✅ Input Validation
- ✅ Data Sanitization
- ✅ Error Handling
- ✅ Client-side Validation

This multi-layered approach ensures your contact form is protected against common attacks while maintaining a smooth user experience for legitimate visitors.