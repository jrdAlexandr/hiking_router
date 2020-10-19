const User = require('../models/user.model');

let addRoute = async (req, res, next) => {
  let user = await User.findById(req.user._id);
  user.progress.push(req.body);

  await user.save();
  res.end();
};

let showRoutes = async (req, res, next) => {
  let user = await User.findById(req.user._id);
  let progress = user.progress;

  res.render('profile', { progress });
};

module.exports = {
  addRoute,
  showRoutes,
};
