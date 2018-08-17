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

var router = _express2.default.Router();

//-------------------------------Auth MiddleWare-------------------
var auth = function auth(req, res, next) {
    var token = req.header('x-access-token');
    jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
        if (err) {
            err.status = 401;
            err.message = 'No auth token provided';
            next(err);
        } else {
            next();
        }
    });
};
//----------------------Sign Up----------------------------------------
router.post('/signup', function (req, res) {
    var hashedPassword = bcrypt.hashSync(req.body.password, 8);
    var userData = {
        name: req.body.name,
        isSeller: req.body.isSeller,
        email: req.body.email,
        password: hashedPassword,
        address: req.body.address,
        pincode: req.body.pincode,
        contact: req.body.contact
    };

    _seekerKeeperModel2.default.create(userData).then(function (user) {
        // create a token
        var token = jwt.sign({
            id: user._id
        }, process.env.JWT_SECRET, {
            expiresIn: 86400 // expires in 24 hours
        });
        res.status(200).send({
            auth: true,
            token: token
        });
    }).catch(function (err) {
        console.log(err);
        res.json({
            result: 'error'
        });
    });
});
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