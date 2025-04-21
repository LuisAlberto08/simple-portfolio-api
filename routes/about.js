const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ name: "Luis Martinez", bio: "Full-Stack developer." });
});

module.exports = router;
