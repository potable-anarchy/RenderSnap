const express = require('express');
const path = require('path');
const router = express.Router();
const renderPage = require('./renderer');

router.post('/render', async (req, res) => {
  const { url, type } = req.body;

  if (!url) {
    return res.status(400).json({ error: 'URL parameter is required.' });
  }

  // Basic URL validation to prevent abuse
  try {
    const urlObj = new URL(url);
    // Block local/private IPs to prevent SSRF
    if (urlObj.hostname === 'localhost' || 
        urlObj.hostname === '127.0.0.1' || 
        urlObj.hostname.startsWith('192.168.') ||
        urlObj.hostname.startsWith('10.') ||
        urlObj.hostname.startsWith('172.')) {
      return res.status(400).json({ error: 'Local URLs are not allowed.' });
    }
  } catch (err) {
    return res.status(400).json({ error: 'Invalid URL format.' });
  }

  // Validate type parameter
  if (type && !['png', 'pdf'].includes(type)) {
    return res.status(400).json({ error: 'Type must be "png" or "pdf".' });
  }

  try {
    const fileName = await renderPage(url, type || 'png');
    res.json({ 
      success: true, 
      fileUrl: `/output/${fileName}`,
      rateLimitInfo: {
        limit: 10,
        window: '1 hour',
        message: 'Free tier: 10 requests per hour per IP'
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.use('/output', express.static(path.join(__dirname, 'output')));

// Health check endpoint that renders a test page
router.get('/health', async (req, res) => {
  try {
    const fileName = await renderPage('https://example.com', 'png');
    res.json({ 
      success: true, 
      message: 'RenderSnap is healthy',
      testUrl: 'https://example.com',
      fileUrl: `/output/${fileName}`,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'RenderSnap health check failed',
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

module.exports = router;