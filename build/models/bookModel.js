'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bookSchema = new Schema({
    isbn: {
        type: String,
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
    }
});

var Book = mongoose.model('Comment', bookSchema);
module.exports = Book;
//# sourceMappingURL=bookModel.js.map