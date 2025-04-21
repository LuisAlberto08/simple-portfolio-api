const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json([
    { name: "Weather App", tech: "JavaScript" },
    { name: "Portfolio Site", tech: "HTML/CSS" }
  ]);
});

module.exports = router;
