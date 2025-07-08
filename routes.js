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