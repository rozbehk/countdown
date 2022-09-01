const express = require('express');
const router = express.Router();
var adminCtrl = require('../controllers/admin')

console.log('admin router')


router.get('/', adminCtrl.index)
router.delete('/:id', adminCtrl.delete)




module.exports = router;