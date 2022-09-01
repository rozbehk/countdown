const express = require('express');
const router = express.Router();
const profileCtrl = require('../controllers/profile');

router.get('/', profileCtrl.index);
// router.post('/', profileCtrl.create);


module.exports = router;