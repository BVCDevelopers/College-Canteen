const express = require('express');
const router = express.Router();
const passport = require('passport');

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

router.get('/shopMenu', (req, res, next) => {
    res.render("shop/shopMenu");
});

module.exports = router;