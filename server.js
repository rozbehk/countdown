var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session')
var logger = require('morgan');
var passport = require('passport');
require('dotenv').config();
require('./config/passport');
require('./config/database')
var methodOverride = require('method-override')


var indexRouter = require('./routes/index');
var moviesRouter = require('./routes/movies');
var seriesRouter = require('./routes/series');
var userRouter = require('./routes/user');
var adminRouter = require('./routes/admin');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: "CountItDown",
  resave: false,
  saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))
app.use('/', indexRouter);
app.use('/movies',isAuthenticated, moviesRouter);
app.use('/series',isAuthenticated, seriesRouter);
app.use('/user',isAuthenticated, userRouter)
app.use('/admin',isAuthenticated,isAdmin ,adminRouter)





function isAuthenticated(req,res,next){
  req.isAuthenticated() ? next() : res.redirect('/auth/google')
}

function isAdmin(req,res,next){
  req.user.isAdmin ? next() : res.redirect('/auth/google')
}
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
