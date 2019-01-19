const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.controller');
const secure = require('../middlewares/secure.mid');

// TODO: protect routes

router.get('/profile', secure.isAuthenticated, usersController.profile);
router.get('/users', secure.isAuthenticated, usersController.list);
router.post('/users/:id/delete', usersController.delete);

module.exports = router;