const express = require('express');
const router = express.Router();
const csrf = require('csurf');
const csrfProtection = csrf();

const shopUserModel = require('../models/shopUserModel');
const studentUserModel = require('../models/studentUserModel');
const storeItemModel = require('../models/storeItemModel');

// Below routes didn't need csrf soo ... mathi lekhhya ...
router.get('/studentLogin', (req, res, next) => {
    res.render('student/studentLogin');
});

router.post('/studentLogin', (req, res, next) => {
    const regdNoIn = req.body.regdNo;
    const passwordIn = req.body.password;
    studentUserModel.findOne({ regdNo: regdNoIn, password: passwordIn })
        .then((results) => {
            if (results) {
                storeItemModel.find({}).limit(16)
                    .then((storeItems) => {
                        shopUserModel.find({})
                            .then((shopUsers) => {
                                res.render('dashboard', {
                                    results: results,
                                    items: storeItems.reverse(),
                                    shopUsers: shopUsers
                                });
                            })
                    });
            } else {
                res.render('student/studentLogin', { result: "Your username or you password is wrong. Please try again." });
            }
        });
});

// Yo vannda tala ko routes haru lai protect gareko .... CSRF haleko xa soo tala lekhhya ..
router.use(csrfProtection);
/* GET home page. */
router.get('/', (req, res, next) => {
    storeItemModel.find({}).limit(16)
        .then((results) => {
            shopUserModel.find({})
                .then((shopList) => {
                    res.render('dashboard', { items: results.reverse(), shopUsers: shopList });
                })
        });
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
