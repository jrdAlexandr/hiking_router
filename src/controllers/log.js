const passport = require("passport")


let login = (req, res) => {
  res.render('login', { messages: req.flash().error || '' })
}

let logAuth = passport.authenticate('local', {
  successRedirect: '/main',
  failureRedirect: '/login',
  failureFlash: true
})


module.exports = {
  login,
  logAuth
}
