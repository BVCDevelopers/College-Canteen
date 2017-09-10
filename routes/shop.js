const express = require('express');
const router = express.Router();
const passport = require('passport');

router.post('/signup', passport.authenticate('local.signup', {
    successRedirect: "/shop/shopMenu",
    failureRedirect: "/",
    failureFlash: true
}));

router.get('/shopMenu', (req, res, next) => {
    res.render("shop/shopMenu");
});

module.exports = router;