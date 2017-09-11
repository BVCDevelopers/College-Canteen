const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const shopUserModel = require('../models/shopUserModel');

passport.serializeUser((shopName, done) => {
    return done(null, shopName.id)
});

passport.deserializeUser((id, done) => {
    shopUserModel.findById(id, (err, shopName) => {
        done(err, shopName);
    });
});

// For signing up ... tyo hashing garrna ko lai gareko natak ho yo ..
passport.use('local.signup', new LocalStrategy({
    usernameField: "shopName",
    passwordField: "password",
    passReqToCallback: true
}, (req, shopName, password, done) => {
    // Express Validator le provide garrxa checkBody() vanney funtion ... 
    req.checkBody('shopName', "Shopname should be greater than 6 characters").notEmpty().isLength({ min: 6 });
    req.checkBody('password', "Password should be greater than 8 characters").notEmpty().isLength({ min: 8 });
    const errors = req.validationErrors();
    if (errors) {
        let messages = [];
        errors.forEach((err) => {
            messages.push(err.msg);
        });
        return done(null, false, req.flash('error', messages));
    }
    shopUserModel.findOne({ 'shopName': shopName })
        .then((err, results) => {
            if (err) {
                return done(err);
            } if (results) {
                return done(null, false, { message: "Already Exists!" });
            }
            const shopUserObj = new shopUserModel();
            shopUserObj.shopName = shopName;
            shopUserObj.password = shopUserObj.encryptPassword(password);
            // Mongodb para ma save gareko ho data ...
            shopUserObj.save((err, results) => {
                if (err) {
                    return done(err);
                }
                return done(null, shopUserObj);
            });
        });
}));

// Yo chai feri login garrna ko lai ...
passport.use('local.signin', new LocalStrategy({
    usernameField: "shopName",
    passwordField: "password",
    passReqToCallback: true
}, (req, shopName, password, done) => {
    // Express Validator le provide garrxa checkBody() vanney funtion ... 
    req.checkBody('shopName', "Shopname should be greater than 6 characters").notEmpty().isLength({ min: 6 });
    req.checkBody('password', "Password should be greater than 8 characters").notEmpty().isLength({ min: 8 });
    const errors = req.validationErrors();
    if (errors) {
        let messages = [];
        errors.forEach((err) => {
            messages.push(err.msg);
        });
        return done(null, false, req.flash('error', messages));
    }

    // yo part ma .then challdaina raixa ... err that returns the current shopName object dinnxa ...
    shopUserModel.findOne({ 'shopName': shopName }, (err, details) => {
        if (err) {
            return done(err);
        } if (!details) {
            return done(null, false, { message: "No Shop Name Found." });
        } if (!details.validPassword(password)) {
            return done(null, false, { message: "You have got your password wrong." });
        }
        return done(null, details);
    });
}));































