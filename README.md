# RenderSnap

A Node.js web service that renders URLs as screenshots or PDFs, perfect for AI agents and automated services that need visual page captures.

## Features
- Capture full-page screenshots in PNG format
- Generate PDF exports of web pages
- RESTful API for easy integration
- Built with Express.js and Playwright

## Quick Start

### Prerequisites
- Node.js 18.x or higher
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/rendersnap.git
cd rendersnap
```

2. Install dependencies:
```bash
npm install
```

3. Install Playwright browsers:
```bash
npx playwright install chromium
```

4. Start the server:
```bash
npm start
```

The server will start on `http://localhost:3000`

## API Documentation

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

**Example:**
```bash
curl -X POST http://localhost:3000/render \
  -H "Content-Type: application/json" \
  -d '{"url": "https://example.com", "type": "pdf"}'
```

## Deployment

### Deploy to Vercel

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

Follow the prompts to complete deployment. Your service will be available at a Vercel URL.

### Environment Variables

- `PORT` - Server port (default: 3000)

## Project Structure

```
rendersnap/
├── index.js          # Express server setup
├── renderer.js       # Playwright rendering logic
├── routes.js         # API endpoints
├── output/           # Generated files directory
├── package.json      # Dependencies and scripts
└── vercel.json       # Vercel configuration
```

## License

MIT
