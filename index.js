const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/about', (req, res) => {
    res.json({ name: "Luis Martinez", bio: "Full-Stack developer." });
});

app.get('/projects', (req, res) => {
    res.json([
        { name: "Weather App", tech: "JavaScript" },
        { name: "Portfolio Site", tech: "HTML/CSS" }
    ]);
});

app.get('/', (req, res) => {
    res.json({ message: "Hello from nodemon-powered API" });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
