const express = require('express');
const router = express.Router();

const { checkLogin } = require('../middleware/auth.middleware');
const aiSumController = require('../controllers/aiSum.controller');

router.post('/aiSum', checkLogin, aiSumController.AISummary);

module.exports = router;