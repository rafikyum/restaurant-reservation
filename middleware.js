module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.returnTo = req.originalUrl;
    req.flash("error", "You must be signed in first!");
    return res.redirect("/users/login");
  }
  next();
};

module.exports.isLoggInText = (req, res, next) => {
  if (req.isAuthenticated()) {
    req.flash("error", "its'done");
    return true;
  }
  next();
};
