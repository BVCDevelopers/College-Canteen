const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const passport = require('passport');

const shopUserSchema = new mongoose.Schema({
    shopName: { type: String, required: true },
    password: { type: String, required: true }
});

shopUserSchema.methods.encryptPassword = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);
};

shopUserSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

const shopUserModel = mongoose.model('shopUser', shopUserSchema);

module.exports = shopUserModel;