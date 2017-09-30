const mongoose = require("mongoose");

const delieverItemSchema = new mongoose.Schema({
    regdNo: { type: String, required: true },
    studentName: { type: String, required: true },
    itemName: { type: String, required: true },
    price: { type: Number, required: true },
    shopName: { type: String, required: true },
    delieveryToPlace: { type: String, require: true }
});

const delieverItemModel = mongoose.model("delieverItem", delieverItemSchema);

module.exports = delieverItemModel;