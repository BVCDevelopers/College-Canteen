const express = require('express');
const router = express.Router();

const canteenModel = require('../models/canteenModel');

/* GET home page. */
router.get('/', (req, res, next) => {
    res.render('index');
});

router.post('/', (req, res, next) => {
    const data = {
        shopName: req.body.shopName,
        item: {
            itemName: req.body.itemName,
            price: req.body.price,
            category: req.body.category
        }
    };
    canteenModel.create(data)
        .then((result) => {
            res.send({ result });
        });
});

module.exports = router;
