const express = require('express');
const router = express.Router();

const shopUserModel = require('../models/shopUserModel');
const storeItemModel = require('../models/storeItemModel');
const studentUserModel = require('../models/studentUserModel');

router.post('/addStudent', (req, res, next) => {
    res.render('shopOperation/addStudent');
});

router.post('/addStudentDetails', (req, res, next) => {
    const studentDetails = {
        regdNo: req.body.regdNo,
        name: req.body.name,
        password: req.body.password,
    };
    studentUserModel.create(studentDetails)
        .then((results) => {
            res.render('shop/shopMenu', { result: results });
        });
});

router.post('/add', (req, res, next) => {
    shopUserModel.find({})
        .then((shops) => {
            res.render('shopOperation/addItems', { shop: shops });
        });
});

router.post('/addItems', (req, res, next) => {
    const itemDetails = {
        shopName: req.body.shopName,
        itemName: req.body.itemName,
        price: req.body.price,
        quantity: req.body.quantity,
        category: req.body.category
    };
    storeItemModel.create(itemDetails)
        .then((results) => {
            res.render('shop/shopMenu', { details: results });
        });
});

router.post('/viewStudents', (req, res, next) => {
    studentUserModel.find({})
        .then((results) => {
            res.render('shop/shopStudentsAccount', { results: results });
        });
});

router.post('/displayAll', (req, res, next) => {
    storeItemModel.find({})
        .then((results) => {
            shopUserModel.find({})
                .then((shopItems) => {
                    res.render('shopOperation/displayAllItems', { results: results.reverse(), shopItems: shopItems });
                });
        });
});

router.post('/items/:shopName', (req, res, next) => {
    const shopName = req.params.shopName;
    storeItemModel.find({ 'shopName': shopName })
        .then((items) => {
            res.render('shopOperation/displayShopItems', { items: items.reverse() });
        });
});

router.post('/delete/:id', (req, res, next) => {
    const id = req.params.id;
    storeItemModel.findByIdAndRemove({ '_id': id })
        .then((results) => {
            storeItemModel.find({ 'shopName': results.shopName })
                .then((itemList) => {
                    res.render('shopOperation/displayShopItems', { items: itemList.reverse(), results: results });
                });
        });
});

module.exports = router;