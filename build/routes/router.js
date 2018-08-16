'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bookModel = require('../models/bookModel');

var _bookModel2 = _interopRequireDefault(_bookModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();
//console.log(Book);

router.get('/book', function (req, res) {
    _bookModel2.default.find({}).then(function (books) {
        res.status(200).json({ books: books });
    }).catch(function (err) {
        res.status(500).json({ err: err });
    });
});

router.post('/book', function (req, res) {
    _bookModel2.default.create(req.body).then(function (book) {
        res.status(200).json({ book: book, msg: 'successfully added book to the database' });
    }).catch(function (err) {
        res.status(500).json({ err: err, msg: 'Error inserting book into the database' });
    });
});

exports.default = router;
//# sourceMappingURL=router.js.map