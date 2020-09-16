const bcrypt = require("bcrypt");
const User = require('../models/user.model')
const passport = require("passport")

let register = (req, res) => {
  res.render('register')
}

let createUser = async (req, res, next) => {
  const { username, password } = req.body
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds)
  try {
    const user = new User({ username: username, password: hashedPassword })
    await user.save();
  } catch (err) {
    console.log(err.message);
    res.render('register', {err})
  }
  next()
}

let regAuth = passport.authenticate('local', {
  successRedirect: '/main',
  failureRedirect: '/register',
  failureFlash: true
})

module.exports = {
  register,
  createUser,
  regAuth
}
