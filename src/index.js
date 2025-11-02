const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// ✅ Point to /src/public since both are under src/
const publicPath = path.join(__dirname, 'public');
console.log('Serving static files from:', publicPath);

// Serve static files
app.use(express.static(publicPath));

app.get('/status', (req, res) => {
  res.json({ status: 'Application is running successfully!' });
});

app.get('/', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
