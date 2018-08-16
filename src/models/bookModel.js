let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let bookSchema = new Schema({
    isbn:{
        type: String,
        trim: true,
        required: true
    },
    name:{
        type: String,
        required: true,
        trim:true
    },
    price:{
        type: Number,
        default: 0
    }
});

var Book = mongoose.model('Comment', bookSchema);
module.exports = Book;