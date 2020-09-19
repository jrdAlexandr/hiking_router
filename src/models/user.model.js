const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 4
  },
  password: {
    type: String,
    required: true,
    minlength: 4
  },
  progress: Array,
});

userSchema.methods.verifyPassword = async function(password) {
  return  bcrypt.compare(password, this.password);
}


module.exports = mongoose.model('User', userSchema);
