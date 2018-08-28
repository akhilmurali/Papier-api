let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let userSchema = new Schema({
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
    mobile: {
        type: Number,
        required: true
    },
    pincode: {
        type: Number,
        required: true
    }
});

var User = mongoose.model('User', userSchema);
export default User;