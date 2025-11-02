const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// ✅ Correct public path (public folder is inside the same src folder)
const publicPath = path.join(__dirname, 'public');
console.log('Serving static files from:', publicPath);

// Serve static files like index.html, style.css, etc.
app.use(express.static(publicPath));

// Health check route
app.get('/status', (req, res) => {
  res.json({ status: 'Application is running successfully!' });
});

// Root route -> serve index.html manually
app.get('/', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
