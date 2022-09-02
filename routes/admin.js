const express = require('express');
const router = express.Router();
var adminCtrl = require('../controllers/admin')

router.get('/search', adminCtrl.searchIndex);
router.get('/movies', adminCtrl.moviesIndex);
router.get('/series', adminCtrl.seriesIndex);
router.get('/', adminCtrl.index)
router.delete('/:id', adminCtrl.delete)
router.post('/search', adminCtrl.search);



module.exports = router;