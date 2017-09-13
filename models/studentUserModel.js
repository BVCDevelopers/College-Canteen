const mongoose = require('mongoose');

const studentUserSchema = new mongoose.Schema({
    regdNo: { type: String, required: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
});

const studentUserModel = mongoose.model('studentUser', studentUserSchema);

module.exports = studentUserModel;