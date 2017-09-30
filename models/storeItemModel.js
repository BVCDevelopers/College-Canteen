const mongoose = require("mongoose");

const storeItemSchema = new mongoose.Schema({
    shopName: { type: String, required: true },
    itemName: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    category: { type: String, required: true },
});

const storeItemModel = mongoose.model("storeItem", storeItemSchema);

module.exports = storeItemModel;