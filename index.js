const express = require('express');
const rateLimit = require('express-rate-limit');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3000;

// Rate limiting configuration
const renderLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10, // Limit each IP to 10 requests per hour
  message: {
    error: 'Too many render requests. Please try again later.',
    limit: 10,
    windowMs: 3600000,
    retryAfter: '1 hour'
  },
  standardHeaders: true,
  legacyHeaders: false,
  // Skip rate limiting for health checks
  skip: (req) => req.path === '/health'
});

const healthLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes  
  max: 20, // Allow more health checks - 20 per 5 minutes
  message: {
    error: 'Too many health check requests. Please try again later.',
    limit: 20,
    windowMs: 300000
  },
  standardHeaders: true,
  legacyHeaders: false
});

app.use(express.json({ limit: '1mb' })); // Limit JSON payload size
app.use('/render', renderLimiter); // Apply rate limit only to render endpoint
app.use('/health', healthLimiter); // Separate rate limit for health checks
app.use('/', routes);

app.listen(PORT, () => {
  console.log(`RenderSnap is live at http://localhost:${PORT}`);
});