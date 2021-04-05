const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
const env = require('node-env-file');
const fs = require('fs');

const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');

const app = express();

// set environment variables from .env if it exists
const envFile = __dirname + '/.env';
if (fs.existsSync(envFile)) {
    env(envFile);
}

const mongoDbDatabase = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@${process.env.MONGODB_HOST}/${process.env.MONGODB_DB}?retryWrites=true&w=majority`;

// connect to database
mongoose.connect(mongoDbDatabase, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).catch((err) => console.error(`Error when connecting to database: ${err.message}`));

mongoose.Promise = Promise;

// session configuration
app.use(session({
    secret: 'lunchy-bunchy',
    resave: true,
    saveUninitialized: true,
}));

// login configuration
require('./middlewares/passport');
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'twig');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// add user
app.use(function (req, res, next) {
    res.locals.user = req.user;
    next();
});

app.use('/', indexRouter);
app.use('/user', userRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    console.error(err);

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
