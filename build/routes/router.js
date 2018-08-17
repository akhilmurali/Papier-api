'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var controller = require('../controllers/authController');
var router = _express2.default.Router();

//----------------------Sign Up----------------------------------------
router.post('/signup', controller.signup);
//-----------------------------Login ----------------------------------
router.post('/login', controller.login);

router.get('/book', function (req, res) {
    Book.find({}).then(function (books) {
        res.status(200).json({
            books: books
        });
    }).catch(function (err) {
        res.status(500).json({
            err: err
        });
    });
});

router.post('/book', function (req, res) {
    Book.create(req.body).then(function (book) {
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
});

exports.default = router;
//# sourceMappingURL=router.js.map