
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    default: null,
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'others'],
  },
  dob: {
    type: Date,
    default: null,
  },
  mobile: {
    type: String,
    default: '',
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
