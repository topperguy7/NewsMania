const express = require('express');
const router = express.Router();

const searchController = require('../controllers/search.controller');
const { checkToken } = require('../middleware/search.middleware');

router.get("/search/:query", checkToken, searchController.search);

module.exports = router;