# RenderSnap

## Objective
Build a Node.js-based web service that renders a given URL and exports the page as a screenshot or PDF. This allows AI agents or other services to easily fetch visual page renderings for feedback or analysis.

## Technical Stack
- Node.js
- Express.js
- Playwright

## Steps

### Step 1: Initialize Project
- Run the following commands:
```bash
npm init -y
npm install express playwright
npx playwright install chromium
mkdir output
````

### Step 2: Project Structure

Set up the project with this file structure:

```
rendersnap/
├── index.js
├── renderer.js
├── routes.js
└── output/
```

### Step 3: Set Up Main App (`index.js`)

Create `index.js`:

```javascript
const express = require('express');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/', routes);

app.listen(PORT, () => {
  console.log(`RenderSnap is live at http://localhost:${PORT}`);
});
```

### Step 4: Create Renderer (`renderer.js`)

Create `renderer.js`:

```javascript
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
```

### Step 5: Define Routes (`routes.js`)

Create `routes.js`:

```javascript
const express = require('express');
const path = require('path');
const router = express.Router();
const renderPage = require('./renderer');

router.post('/render', async (req, res) => {
  const { url, type } = req.body;

  if (!url) {
    return res.status(400).json({ error: 'URL parameter is required.' });
  }

  try {
    const fileName = await renderPage(url, type || 'png');
    res.json({ success: true, fileUrl: `/output/${fileName}` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.use('/output', express.static(path.join(__dirname, 'output')));

module.exports = router;
```

### Step 6: Running the App

Start the server with:

```bash
node index.js
```

### Step 7: Example Usage

Use this command to test:

```bash
curl -X POST -H "Content-Type: application/json" \
-d '{"url":"https://example.com","type":"pdf"}' \
http://localhost:3000/render
```

The rendered file URL will be returned in the response JSON.

---

```
```
