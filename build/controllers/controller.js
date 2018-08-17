'use strict';

var _bookModel = require('../models/bookModel');

var _bookModel2 = _interopRequireDefault(_bookModel);

var _seekerKeeperModel = require('../models/seekerKeeperModel');

var _seekerKeeperModel2 = _interopRequireDefault(_seekerKeeperModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
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

//-------------------sign up ----------------------------------

exports.signup = function (req, res) {
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
};
//# sourceMappingURL=controller.js.map