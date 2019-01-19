const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const secure = require('../middlewares/secure.mid');

router.get('/login', authController.login);
router.post('/login', authController.doLogin);

router.get('/register', authController.register);
router.post('/register', authController.doRegister);

router.get('/logout', authController.logout);
router.get('/profile', secure.isAuthenticated, authController.profile);

module.exports = router;
