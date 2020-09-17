module.exports = (req, res, next) => {
  res.locals.username = req.user?.username
  next()
}
