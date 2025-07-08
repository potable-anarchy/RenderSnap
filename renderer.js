const { chromium } = require('playwright');
const path = require('path');

async function renderPage(url, type = 'png') {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'networkidle' });

  const fileName = `render_${Date.now()}.${type}`;
  const filePath = path.join(__dirname, 'output', fileName);

  if (type === 'pdf') {
    await page.pdf({ path: filePath, format: 'A4' });
  } else {
    await page.screenshot({ path: filePath, fullPage: true });
  }

  await browser.close();

  return fileName;
}

module.exports = renderPage;