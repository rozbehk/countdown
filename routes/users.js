var express = require('express')
var router = express.Router()
var userCtrl = require('../controllers/users')

router.get('/users', userCtrl.index)

