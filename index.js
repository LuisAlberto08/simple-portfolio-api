const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Route imports
const aboutRoute = require('./routes/about');
const projectsRoute = require('./routes/projects');

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Route registration
app.use('/about', aboutRoute);
app.use('/projects', projectsRoute);

// Contact routes
app.get('/contact', (req, res) => {
  res.json({ message: 'Contact form goes here!' });
});

app.post('/contact', (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  console.log('📬 New message received:', { name, email, message });

  res.status(200).json({ success: true, message: 'Message received!' });
});

// Catch-all 404 fallback
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
