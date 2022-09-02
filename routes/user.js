var express = require('express')
var router = express.Router()
var userCtrl = require('../controllers/user')

router.get('/movies', userCtrl.moviesIndex);
router.get('/series', userCtrl.seriesIndex);
router.get('/', userCtrl.index)
router.put('/:id', userCtrl.update)
router.delete('/:id', userCtrl.delete)


module.exports = router;