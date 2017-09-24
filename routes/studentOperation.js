const express = require('express');
const router = express.Router();

const bookedItemModel = require('../models/bookedItemModel');
const delieverItemModel = require('../models/delieverItemModel');

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
            price: req.query.price,
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

router.get('/deliever', (req, res, next) => {
    if (req.session.regdNoIn || req.session.studentName) {
        const delieverItem = {
            regdNo: req.session.regdNoIn,
            studentName: req.session.studentName,
            itemName: req.query.itemName,
            price: req.query.price,
            shopName: req.query.shopName
        };
        res.render('student/whereToDeliever', { delieverItem: delieverItem });
    } else {
        res.redirect('/');
    }
});

router.post('/whereToDeliever', (req, res, next) => {
    if (req.session.regdNoIn || req.session.studentName) {
        const delieverItem = {
            regdNo: req.session.regdNoIn,
            studentName: req.session.studentName,
            itemName: req.query.itemName,
            price: req.query.price,
            shopName: req.query.shopName,
            delieveryToPlace: req.body.whereTo
        };
        delieverItemModel.create(delieverItem)
            .then((results) => {
                res.render('student/itemDeliever', { results: results });
            });
    }
});


module.exports = router;