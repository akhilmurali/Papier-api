'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bookSchema = new Schema({
    isbn: {
        type: Number,
        trim: true,
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        default: 0
    },
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        default: 0
    },
    b64: {
        type: String,
        required: false
    },
    uid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

var Book = mongoose.model('Book', bookSchema);
module.exports = Book;
//# sourceMappingURL=bookModel.js.map