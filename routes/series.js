const express = require('express');
const router = express.Router();
const seriesCtrl = require('../controllers/series');

router.get('/new', seriesCtrl.new);
router.get('/:id',seriesCtrl.show)
router.get('/', seriesCtrl.index);
router.post('/', seriesCtrl.create);


module.exports = router;