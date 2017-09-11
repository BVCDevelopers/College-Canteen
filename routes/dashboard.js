const express = require('express');
const router = express.Router();
const csrf = require('csurf');
const csrfProtection = csrf();

router.use(csrfProtection);
/* GET home page. */
router.get('/', (req, res, next) => {
    res.render('dashboard');
});

// Sign in garrda ko le tala ko kaam garrney ...
router.get('/shopSignIn', (req, res, next) => {
    const errorMessage = req.flash('error');
    res.render('shop/shopSignIn', {
        csrfToken: req.csrfToken(),
        errors: errorMessage,
        hasErrors: errorMessage.length > 0
    });
});

// Sign up garrda tala ko le kaam garrney ..,
router.get('/shopSignUp', (req, res, next) => {
    const errorMessage = req.flash('error');
    res.render('shop/shopSignUp', {
        csrfToken: req.csrfToken(),
        errors: errorMessage,
        hasErrors: errorMessage.length > 0
    });
});

module.exports = router;
