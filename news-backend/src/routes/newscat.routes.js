const express = require('express');
const router = express.Router();

const newsCatController = require('../controllers/newscat.controller');

router.get('/news/:category', newsCatController.newscat);

module.exports = router;