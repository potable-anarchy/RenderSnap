const { chromium } = require('playwright');
const path = require('path');

async function renderPage(url, type = 'png') {
  let browser;
  
  try {
    // Launch browser with resource-saving options
    browser = await chromium.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-dev-shm-usage',
        '--disable-gpu',
        '--disable-background-networking',
        '--disable-background-timer-throttling',
        '--disable-renderer-backgrounding',
        '--disable-backgrounding-occluded-windows',
        '--disable-extensions'
      ]
    });
    
    const page = await browser.newPage();
    
    // Set a shorter timeout to save resources
    page.setDefaultTimeout(30000); // 30 seconds max
    
    // Block unnecessary resources to save bandwidth/time
    await page.route('**/*', (route) => {
      const resourceType = route.request().resourceType();
      // Block ads, analytics, and other non-essential resources
      if (['image', 'media', 'font'].includes(resourceType)) {
        route.abort();
      } else {
        route.continue();
      }
    });
    
    // Navigate with shorter timeout
    await page.goto(url, { 
      waitUntil: 'domcontentloaded', // Faster than networkidle
      timeout: 30000 
    });

    const fileName = `render_${Date.now()}.${type}`;
    const filePath = path.join(__dirname, 'output', fileName);

    if (type === 'pdf') {
      await page.pdf({ 
        path: filePath, 
        format: 'A4',
        timeout: 30000
      });
    } else {
      await page.screenshot({ 
        path: filePath, 
        fullPage: true,
        timeout: 30000
      });
    }

    return fileName;
    
  } finally {
    // Always close browser to free resources
    if (browser) {
      await browser.close();
    }
  }
}

module.exports = renderPage;