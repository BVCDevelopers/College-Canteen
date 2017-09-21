const express = require('express');
const router = express.Router();

const shopUserModel = require('../models/shopUserModel');
const storeItemModel = require('../models/storeItemModel');
const studentUserModel = require('../models/studentUserModel');
const bookedItemModel = require('../models/bookedItemModel');

router.post('/addStudent', (req, res, next) => {
    res.render('shopOperation/addStudent');
});

router.post('/addStudentDetails', (req, res, next) => {
    res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0')
    const studentDetails = {
        regdNo: req.body.regdNo,
        name: req.body.name,
        password: req.body.password,
    };
    studentUserModel.findOne({ 'regdNo': req.body.regdNo })
        .then((studentData) => {
            if (studentData) {
                res.render('shop/shopMenu', { errorMsg: studentDetails });
            } else {
                studentUserModel.create(studentDetails)
                    .then((results) => {
                        res.render('shop/shopMenu', { result: results });
                    });
            }
        });
});

router.post('/add', (req, res, next) => {
    shopUserModel.find({})
        .then((shops) => {
            res.render('shopOperation/addItems', { shop: shops });
        });
});

router.post('/addItems', (req, res, next) => {
    res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
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

// Edit page routing ...
router.post('/edit/:id', (req, res, next) => {
    const id = req.params.id;
    storeItemModel.findOne({ '_id': id })
        .then((results) => {
            res.render('shopOperation/editItemForm', { results: results });
        });
});

// Edit items by shop user ...
router.post('/editItems/:id', (req, res, next) => {
    const id = req.params.id;
    const newData = {
        itemName: req.body.itemName,
        price: req.body.price,
        quantity: req.body.quantity,
        category: req.body.category
    };
    storeItemModel.findByIdAndUpdate({ '_id': id }, newData)
        .then((results) => {
            storeItemModel.find({ shopName: results.shopName })
                .then((dataBack) => {
                    res.render('shopOperation/displayShopItems', { items: dataBack.reverse() });
                });
        });
});

// Viewing all booked items by students ...
router.post('/viewBookedItems', (req, res, next) => {
    bookedItemModel.find({})
        .then((results) => {
            shopUserModel.find({})
                .then((shopList) => {
                    res.render('shop/bookedItems', { results: results, shopList: shopList });
                });
        });
});

// Categorized items in booked by shop basis ...
router.get('/bookedByShop', (req, res, next) => {
    const shopName = req.query.shopName;
    if (shopName) {
        bookedItemModel.find({ 'shopName': shopName })
            .then((results) => {
                shopUserModel.find({})
                    .then((shopList) => {
                        res.render('shop/bookedItems', { results: results, shopList: shopList });
                    });
            });
    } else {
        bookedItemModel.find({})
            .then((results) => {
                shopUserModel.find({})
                    .then((shopList) => {
                        res.render('shop/bookedItems', { results: results, shopList: shopList });
                    });
            });
    }
});

// remove items that are booked by students (After students takes the item/s ) ...
router.post('/removeBookedItem/:id', (req, res, next) => {
    const id = req.params.id;
    bookedItemModel.findByIdAndRemove({ '_id': id })
        .then((removedItem) => {
            bookedItemModel.find()
                .then((results) => {
                    shopUserModel.find({})
                        .then((shopList) => {
                            res.render('shop/bookedItems', { results: results, shopList: shopList });
                        });
                });
        });
});

module.exports = router;