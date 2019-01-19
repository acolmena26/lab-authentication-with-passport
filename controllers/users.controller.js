const createError = require('http-errors');
const User = require('../models/user.model');
const mongoose = require("mongoose");

module.exports.profile = (req, res, next) => {
  res.render('users/profile');
}

module.exports.list = (req, res, next) => {
  User.find()
    .then(users => {
      res.render('users/list', {
        users: users
      });
    })
    .catch(error => next(error));
}

module.exports.delete = (req, res, next) => {
  // TODO: delete user (needs logout if its the current user)
  User.findByIdAndDelete(req.params.id)
    .then(user => {
      if (!user) {
        next(createError(404));
      } else {
        if (req.user.id === user.id) {
          res.redirect('/logout');
        } else {
          res.redirect('/users');
        }
        
      }
    })
    .catch(error => next(error));
}
