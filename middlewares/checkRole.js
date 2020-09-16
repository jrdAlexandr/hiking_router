module.exports = (req, res, next) => {
  res.locals.admin = req.user?.role === 'admin'
  next()
}