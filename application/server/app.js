const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const passport = require('passport');
require('dotenv').config();
const uri = process.env.MONGODB_URL;

var indexRouter = require('./routes/index');

var app = express();

console.log('hi ' + uri)
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  //useFindAndModify: false,
  //useCreateIndex: true
}).then(() => {
  console.log('mongodb connection')
}).catch(e => console.log(e));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

console.log()

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});



// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
