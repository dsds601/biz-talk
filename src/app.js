const createError = require('http-errors');
const express = require('express');
const ejsLayouts = require('express-ejs-layouts');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const dotenv = require('dotenv');

const indexRouter = require('./routes');
const utils = require('./utils/common');

const app = express();

// env setting
setEnv(dotenv);

// view engine setup
app.use(express.static('public'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(ejsLayouts);
app.set('layout', 'layout');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use((req ,res ,next) => {
  next(createError(404));
})

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});


// envSetting
function setEnv() {
  switch (process.env.NODE_ENV) {
    case 'dev':
      dotenv.config({ path: '.env.dev' });
      break;
    case 'test':
      dotenv.config({ path: '.env.test' });
      break;
    case 'prod':
      dotenv.config({ path: '.env.prod' });
      break;
    // default 개발
    default:
      dotenv.config({ path: '.env.dev' });
  }
}