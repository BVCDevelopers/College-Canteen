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

passport.use('local.signup', new LocalStrategy({
    usernameField: "shopName",
    passwordField: "password",
    passReqToCallback: true
}, (req, shopName, password, done) => {
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
            shopUserObj.save((err, results) => {
                if (err) {
                    return done(err);
                }
                return done(null, shopUserObj);
            });
        });
}));