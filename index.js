const express = require('express');
const app = express();
const PORT = 3000;

// Route imports
const aboutRoute = require('./routes/about');
const projectsRoute = require('./routes/projects');

app.use(express.json());

// Register routes
app.use('/about', aboutRoute);
app.use('/projects', projectsRoute); 

app.get('/', (req, res) => {
    res.json({ message: "Hello from nodemon-powered API" });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
