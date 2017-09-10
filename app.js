const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const expressHandlebars = require('express-handlebars');
const expSession = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');

const dashboard = require('./routes/dashboard');
const shop = require('./routes/shop');

const app = express();

// mongodb ...
mongoose.connect("mongodb://localhost/canteen", (error) => {
    if (error) console.log(error);
});
mongoose.Promise = global.Promise;

require('./config/passport');
// view engine setup
app.engine('.hbs', expressHandlebars({ defaultLayout: 'layout', extname: '.hbs' }));
app.set('view engine', '.hbs');

// uncomment after placing your favicon in /public
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(expSession({ secret: 'ilovesprogramminginnode', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', dashboard);
app.use('/shop', shop);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
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
