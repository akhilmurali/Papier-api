let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let bookSchema = new Schema({
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
    path: {
        type: String,
        required: true
    },
    description: String,

    author: {
        type: String,
        required: false
    },
    quantity: {
        type: Number,
        required: false,
        default: 0
    },
}, {
    collection: 'books'

});

let Book = mongoose.model('Book', bookSchema);
export default Book;
