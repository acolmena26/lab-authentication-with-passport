const User = require('../models/user.model');
const mongoose = require('mongoose');
const passport = require('passport');

module.exports.login = (req, res, next) => {
  res.render('auth/login');
}

module.exports.doLogin = (req, res, next) => {
  // TODO: authenticate user
  function renderWithErrors(users, errors){
    res.render("auth/login", {
      user: users,
      errors: errors
    })
  }

  // const email = req.body.email; (CALLED RESTRUCTURING)

  const {email, password} = req.body;
  if (!email || !password){
    res.renderWithErrors(req.body, {
      email: email ? undefined: "email is required",
      password: password ? undefined: "password is required"
    });
  } else {
    passport.authenticate('local-auth', (error, users, validation) => {
      if(error){
        next(error);
      } else if(!users){
        renderWithErrors(req.body, validation);
      } else {
        req.login(users, (error) => {
          if(error){
            next(error);
          } else {
            res.redirect("/profile");
          }
        });
      }
    })(req, res, next);
  }
}

module.exports.register = (req, res, next) => {
  res.render('auth/register');
}

module.exports.doRegister = (req, res, next) => {

  function renderWithErrors(user, errors) {
    res.render('auth/register', {
      user: user,
      errors: errors
    });
  }

  User.findOne({ email: req.body.email })
    .then(user => {
      if (user) {
        renderWithErrors(req.body, {
          email: 'Email is already registered'
        });
      } else {
        console.log(req.body.email);
        user = new User({
          email: req.body.email,
          password: req.body.password
        })
        return user.save()
          .then(user => {
            res.redirect('/login');
          });
      }
    })
    .catch(error => {
      if (error instanceof mongoose.Error.ValidationError) {
        renderWithErrors(req.body, error.errors);
      } else {
        next(error);
      }
    });
}

module.exports.logout = (req, res, next) => {
  // TODO: destroy session
  req.logout();
  res.redirect('/login');
}

module.exports.profile = (req, res, next) => {
  res.render('users/profile');
}