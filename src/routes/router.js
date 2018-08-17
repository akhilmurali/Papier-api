import express from 'express';
import Book from '../models/bookModel';
import User from '../models/userModel';

var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var controller = require('../controllers/controller');
let router = express.Router();


//----------------------Sign Up----------------------------------------
router.post('/signup', controller.signup)
//-----------------------------Login ----------------------------------
router.post('/login', function (req, res) {
    SeekKeep.findOne({
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




router.get('/book', (req, res) => {
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
});

router.post('/book', (req, res) => {
    Book.create(req.body)
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
});

export default router;