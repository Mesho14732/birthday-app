const express = require('express');
const router = express.Router();
const User = require('../Models/user');

router.post('/add', async (req, res) => {
  const { username, email, dateOfBirth } = req.body;
  const user = new User({ username, email, dateOfBirth });
  await user.save();
  res.redirect('/');
});

module.exports = router;