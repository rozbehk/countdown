const express = require('express');
const router = express.Router();
const seriesCtrl = require('../controllers/series');

router.get('/', seriesCtrl.index);
router.get('/new', seriesCtrl.new);
router.post('/', seriesCtrl.create);

module.exports = router;