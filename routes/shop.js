const express = require('express');
const router = express.Router();
const passport = require('passport');

const shopUserModel = require('../models/shopUserModel');
const storeItemModel = require('../models/storeItemModel');

// yo method ko bichha ko le route lai protect mattra garrxa ... 
// Method ko reference yeta xa .. ie do not execute here ...
router.get('/shopMenu', isLoggedIn, (req, res, next) => {
    res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
    req.session.regdNoIn = null;
    req.session.studentName = null;
    res.render("shop/shopMenu");
});

router.post('/signup', passport.authenticate('local.signup', {
    successRedirect: "/shop/shopMenu",
    failureRedirect: "/shopSignUp",
    failureFlash: true
}));

router.post('/signin', passport.authenticate('local.signin', {
    successRedirect: "/shop/shopMenu",
    failureRedirect: "/shopSignIn",
    failureFlash: true
}));

router.get('/logout', (req, res, next) => {
    // passport provides logout function ...
    req.logOut();
    res.redirect('/');
});

// For displaying items that are available in a paticular shop ...
router.get('/shopItems/:shopName', (req, res, next) => {
    const shopName = req.params.shopName;
    storeItemModel.find({ 'shopName': shopName })
        .then((results) => {
            shopUserModel.find({})
                .then((shopList) => {
                    res.render('dashboard', { shopItems: results, shopUsers: shopList });
                });
        });
});

module.exports = router;

function isLoggedIn(req, res, next) {
    // isAuthenticated() is provided in passport using sessions ...
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}
