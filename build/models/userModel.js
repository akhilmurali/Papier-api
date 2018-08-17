'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    isSeller: {
        type: Boolean,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true

    },
    contact: {
        type: Number,
        required: true
    },
    pincode: {
        type: Number,
        required: true
    }
});

var User = mongoose.model('User', userSchema);
module.exports = User;
//# sourceMappingURL=userModel.js.map