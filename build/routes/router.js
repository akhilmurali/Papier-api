'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bookModel = require('../models/bookModel');

var _bookModel2 = _interopRequireDefault(_bookModel);

var _seekerKeeperModel = require('../models/seekerKeeperModel');

var _seekerKeeperModel2 = _interopRequireDefault(_seekerKeeperModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var controller = require('../controllers/controller');
var router = _express2.default.Router();

//----------------------Sign Up----------------------------------------
router.post('/signup', controller.signup);
//-----------------------------Login ----------------------------------
router.post('/login', function (req, res) {
    _seekerKeeperModel2.default.findOne({
        email: req.body.email
    }, function (err, user) {
        if (err) return res.status(500).send('Error on the server.');
        if (!user) return res.status(404).send('User not found');
        var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if (!passwordIsValid) return res.status(401).send({
            auth: false,
            token: null
        });
        var token = jwt.sign({
            id: user._id
        }, process.env.JWT_SECRET, {
            expiresIn: 86400
        });
        res.status(200).send({
            auth: true,
            token: token
        });
    });
});

router.get('/book', function (req, res) {
    _bookModel2.default.find({}).then(function (books) {
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
    _bookModel2.default.create(req.body).then(function (book) {
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