const express = require('express');
const router = express.Router();

const isLoginController = require('../controllers/isLogin.controller');

router.get('/isLogin', isLoginController.isLogin);

module.exports = router;