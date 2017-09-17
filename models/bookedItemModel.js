const mongoose = require('mongoose');

const bookedItemSchema = new mongoose.Schema({
    regdNo: { type: String, required: true },
    studentName: { type: String, required: true },
    itemName: { type: String, required: true },
    shopName: { type: String, required: true }
});

const bookedItemModel = mongoose.model('bookedItem', bookedItemSchema);

module.exports = bookedItemModel;