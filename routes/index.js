const express = require('express');
const router = express.Router();

const canteenModel = require('../models/canteenModel');

/* GET home page. */
router.get('/', (req, res, next) => {
    res.render('index');
});

router.post('/', (req, res, next) => {
});

module.exports = router;
