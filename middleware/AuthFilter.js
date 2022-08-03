const AuthMiddleware = (req, res, next) => {
  console.log(req.session.user);
  if (!req.session.user) {
    res.redirect("login");
  }
  next();
};
module.exports = AuthMiddleware;
