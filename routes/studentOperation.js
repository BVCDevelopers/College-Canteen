const express = require('express');
const router = express.Router();

const bookedItemModel = require('../models/bookedItemModel');

router.get('/', (req, res, next) => {
    // For logging student out ...
    req.session.regdNoIn = null;
    req.session.studentName = null;
    res.redirect('/');
});

router.get('/book', (req, res, next) => {
    if (req.session.regdNoIn || req.session.studentName) {
        const bookedItem = {
            regdNo: req.session.regdNoIn,
            studentName: req.session.studentName,
            itemName: req.query.itemName,
            shopName: req.query.shopName
        };
        bookedItemModel.create(bookedItem)
            .then((results) => {
                res.render('student/itemBooked', { results: results });
            });
    } else {
        res.redirect('/');
    }
});

module.exports = router;