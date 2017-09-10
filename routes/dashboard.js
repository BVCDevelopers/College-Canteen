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
    res.render('shop/shopSignUp', { csrfToken: req.csrfToken() });
});

module.exports = router;
