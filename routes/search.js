const express = require('express');
const router = express.Router();
const searchCtrl = require('../controllers/search');


router.get('/', searchCtrl.index);
router.post('/', searchCtrl.search);
module.exports = router;