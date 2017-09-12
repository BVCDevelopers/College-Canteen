const express = require('express');
const router = express.Router();
const passport = require('passport');

// yo method ko bichha ko le route lai protect mattra garrxa ... 
// Method ko reference yeta xa .. ie do not execute here ...
router.get('/shopMenu', isLoggedIn, (req, res, next) => {
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

module.exports = router;

function isLoggedIn(req, res, next) {
    // isAuthenticated() is provided in passport using sessions ...
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}
