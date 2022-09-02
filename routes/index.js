var router = require('express').Router();
const passport = require('passport');
const indexCtrl = require('../controllers/index');



/* GET home page. */
router.get('/', indexCtrl.index);

router.get('/auth/google',passport.authenticate(
  'google',
  {scope: ['profile','email']}
))

router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect: '/',
    failureRedirect: '/'
  }
))

router.get('/logout',function(req,res,next){
  req.logout(function(err){
    res.redirect('/')
  })
})

module.exports = router;
