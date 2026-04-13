const express = require('express');
const router = express.Router();

const topNewsController = require('../controllers/topnews.controller');

router.get('/top-news', topNewsController.Topnews);

module.exports = router;