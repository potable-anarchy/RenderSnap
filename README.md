# RenderSnap

A fast, reliable web service that renders URLs as screenshots or PDFs. Perfect for AI agents, automated services, and developers who need programmatic visual page captures.

## 🚀 Features

- **Screenshot Capture**: Full-page screenshots in PNG format
- **PDF Generation**: Export web pages as PDF documents  
- **RESTful API**: Simple JSON API for easy integration
- **Fast & Reliable**: Built with Express.js and Playwright
- **Cloud Ready**: Deployed on Vercel with global edge network

## 🌐 Service Endpoint

**Production URL**: `https://render-snap-6xfbvzz1j-bradtacos-projects.vercel.app`

> **Note**: Currently requires authentication due to team security settings. For public access, run locally or contact for access.

## 🚀 Quick Start

### Test the API
```bash
curl -X POST https://render-snap-6xfbvzz1j-bradtacos-projects.vercel.app/render \
  -H "Content-Type: application/json" \
  -d '{"url": "https://example.com", "type": "png"}'
```

### Run Locally
```bash
git clone https://github.com/yourusername/rendersnap.git
cd rendersnap
npm install
npx playwright install chromium
npm start
```

## 📚 API Documentation

### POST /render

Renders a URL as a screenshot or PDF.

**Request Body:**
```json
{
  "url": "https://example.com",
  "type": "png"  // optional: "png" (default) or "pdf"
}
```

**Response:**
```json
{
  "success": true,
  "fileUrl": "/output/render_1234567890.png"
}
```

**Error Response:**
```json
{
  "error": "URL parameter is required."
}
```

### GET /output/{filename}

Serves the generated screenshot or PDF file.

**Example:**
```
GET /output/render_1234567890.png
```

## 🔧 Technical Details

- **Framework**: Express.js with Playwright
- **Rendering Engine**: Chromium browser
- **Supported Formats**: PNG screenshots, PDF exports
- **Hosting**: Vercel with Node.js runtime
- **Response Time**: Typically 2-5 seconds depending on page complexity

## 📋 Rate Limits & Usage

- No authentication required for local deployment
- Cloud deployment currently has team-level access restrictions
- Recommended for development and testing purposes
- For production use, consider implementing rate limiting

## 🤝 Support

For issues, feature requests, or questions:
- Open an issue on GitHub
- Check the API documentation below
- Test locally if cloud service is unavailable

## 📝 Usage Examples

### Basic Screenshot
```bash
curl -X POST http://localhost:3000/render \
  -H "Content-Type: application/json" \
  -d '{"url": "https://github.com"}'
```

### PDF Export
```bash
curl -X POST http://localhost:3000/render \
  -H "Content-Type: application/json" \
  -d '{"url": "https://github.com", "type": "pdf"}'
```

### JavaScript Integration
```javascript
const response = await fetch('http://localhost:3000/render', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ url: 'https://example.com', type: 'png' })
});
const result = await response.json();
console.log(result.fileUrl); // "/output/render_1234567890.png"
```

## 📄 License

MIT
