const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  dateOfBirth: Date,
});

User = module.exports = mongoose.model('User', userSchema);