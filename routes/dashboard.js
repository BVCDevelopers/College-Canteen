const express = require('express');
const router = express.Router();
const csrf = require('csurf');
const csrfProtection = csrf();

router.use(csrfProtection);
/* GET home page. */
router.get('/', (req, res, next) => {
    res.render('dashboard');
});

router.get('/shopSignUp', (req, res, next) => {
    const errorMessage = req.flash('error');
    res.render('shop/shopSignUp', {
        csrfToken: req.csrfToken(),
        errorMessage: errorMessage,
        hasErrors: errorMessage.length > 0
    });
});

module.exports = router;
