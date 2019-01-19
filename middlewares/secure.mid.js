

module.exports.isAuthenticated = (req, res, next) => {
  // TODO: ensure user logged & redirect to login if not authenticated
  if(req.isAuthenticated()){
    next();
  } else {
    res.redirect("/login");
  }
}

