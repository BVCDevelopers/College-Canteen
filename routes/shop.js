const express = require('express');
const router = express.Router();

const canteenModel = require('../models/canteenModel');

router.get('/:shop', (req, res, next) => {
    const shop = req.params.shop;
    canteenModel.find({ shopName: shop })
        .then((results) => {
            res.render('shop', { results: results });
        });
});

module.exports = router;