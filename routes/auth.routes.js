const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const secure = require('../middlewares/secure.mid');


router.get('/login', secure.isNotAuthenticated,  authController.login);
router.post('/login',secure.isNotAuthenticated, authController.doLogin);

router.get('/register',secure.isNotAuthenticated, authController.register);
router.post('/register',secure.isNotAuthenticated, authController.doRegister);

router.get('/logout', authController.logout);
router.get('/profile', secure.isAuthenticated, authController.profile);

module.exports = router;
