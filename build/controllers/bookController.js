'use strict';

var _bookModel = require('../models/bookModel');

var _bookModel2 = _interopRequireDefault(_bookModel);

var _router = require('../routes/router');

var _router2 = _interopRequireDefault(_router);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//-------------------Get All Books-------------------------------
exports.getBooks = function (req, res) {
    _bookModel2.default.find({}).then(function (books) {
        res.status(200).json({
            books: books
        });
    }).catch(function (err) {
        res.status(500).json({
            err: err
        });
    });
};
//---------------Add Book --------------------------------------------
exports.addBooks = function (req, res) {

    var bookData = {
        name: req.body.name,
        isbn: req.body.isbn,
        price: req.body.price,
        title: req.body.title,
        author: req.body.author,
        quantity: req.body.quantity
        // b64: base64,
    };

    _bookModel2.default.create(bookData).then(function (book) {
        res.status(200).json({
            book: book,
            msg: 'successfully added book to the database'
        });
    }).catch(function (err) {
        res.status(500).json({
            err: err,
            msg: 'Error inserting book into the database'
        });
    });
};
//# sourceMappingURL=bookController.js.map