const express = require('express');
const router = express.Router();
const moviesCtrl = require('../controllers/movies');

console.log('movie router')
router.get('/:id',moviesCtrl.show)
router.get('/new', moviesCtrl.new);
router.get('/', moviesCtrl.index);
router.post('/', moviesCtrl.create);


module.exports = router;