const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    itemName: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String
    }
});

const canteenSchema = new mongoose.Schema({
    shopName: {
        type: String,
        required: true
    },
    item: itemSchema
});

const canteenModel = mongoose.model('canteen', canteenSchema);

module.exports = canteenModel;
