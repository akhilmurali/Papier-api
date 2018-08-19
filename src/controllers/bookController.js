import Book from '../models/bookModel';
import router from '../routes/router';

//-------------------Get All Books-------------------------------
exports.getBooks = function (req, res) {
    Book.find({})
        .then((books) => {
            res.status(200).json({
                books
            });
        })
        .catch((err) => {
            res.status(500).json({
                err
            })
        });
}
//---------------Add Book --------------------------------------------
exports.addBooks = function (req, res) {


    var bookData = {
        name: req.body.name,
        isbn: req.body.isbn,
        price: req.body.price,
        title: req.body.title,
        author: req.body.author,
        quantity: req.body.quantity,
        // b64: base64,
    }


    Book.create(bookData)
        .then((book) => {
            res.status(200).json({
                book,
                msg: 'successfully added book to the database'
            });
        })
        .catch((err) => {
            res.status(500).json({
                err,
                msg: 'Error inserting book into the database'
            });
        });
}



