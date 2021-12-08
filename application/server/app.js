require('dotenv').config();
const express = require('express');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const passport = require('./passport/spotify');
const mongoose = require('mongoose');
const cors = require('cors');

const oauthRouter = require('./routes/oauth');
const authRouter = require('./routes/auth')
const preferenceRouter = require('./routes/preferences');
const recommendationRouter = require('./routes/recommendation');
const apiErrorHandler = require('./error/api-error-handler');
const ApiError = require('./error/ApiError');

const port = 3030;

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('mongodb connection')
}).catch(e => console.log(e));

const app = express();

// middlewares
app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: '*',
  credentials: true
}));
app.use(passport.initialize());

/* GET home page. */
app.get('/', function (req, res) {
  console.log(req.user);
  return res.send('Server is up and running!');
});

// route middlewares
app.use('/oauth', oauthRouter);
app.use('/auth', authRouter);
app.use('/recommendation', recommendationRouter);
app.use('/preference', preferenceRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(ApiError.notFound('Page not found'));
});

// error handler
app.use(apiErrorHandler);

/*
// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(err);
});
*/

app.listen(process.env.port || port, () => {
  if (process.env.port) console.log(`home page listening at http://localhost:${process.env.port}`)
  else console.log(`home page listening at http://localhost:${port}`)
})

module.exports = app;
