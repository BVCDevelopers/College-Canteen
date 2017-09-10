const mongoose = require('mongoose');

const shopUserSchema = new mongoose.Schema({
    shopName: { type: String, required: true },
    password: { type: String, required: true }
});

const shopUserModel = mongoose.model('shopUser', shopUserSchema);

module.exports = shopUserModel;