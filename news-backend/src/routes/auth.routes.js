const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth.controller');
const { checkLogin } = require('../middleware/auth.middleware');

router.post("/sign", authController.authSign);
router.post("/login", authController.authLogin);
router.post("/logout", checkLogin, authController.authLogout);
router.post("status", authController.authStatus);

module.exports = router;