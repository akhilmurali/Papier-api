'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bookSchema = new Schema({
    isbn: {
        type: Number,
        trim: true,
        required: false
    },
    name: {
        type: String,
        required: false,
        trim: true
    },
    price: {
        type: Number,
        default: 0
    },
    title: {
        type: String,
        required: false
    },
    path: String,
    description: String,

    author: {
        type: String,
        required: false
    },
    quantity: {
        type: Number,
        required: false,
        default: 0
    }
}, {
    collection: 'images'

});

var Book = mongoose.model('Book', bookSchema);
module.exports = Book;
//# sourceMappingURL=bookModel.js.map