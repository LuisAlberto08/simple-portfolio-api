const express = require('express');
const router = express.Router();

// GET /contact - return a simple message or contact info
router.get('/', (req, res) => {
    res.json({
        message: 'Contact me at luis@example.com',
        email: 'luis@example.com'
    });
});

// POST /contact - simulate submitting a message
router.post('/', (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ error: 'Please provide name, email, and message' });
    }

    res.status(200).json({
        message: 'Thanks for reaching out!',
        data: { name, email, message }
    });
});

module.exports = router;
