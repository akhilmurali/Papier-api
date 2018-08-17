import express from 'express';
import Book from '../models/bookModel';
import SeekKeep from '../models/seekerKeeperModel';

var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

let router = express.Router();

//-------------------------------Auth MiddleWare-------------------
var auth = (req, res, next) => {
    let token = req.header('x-access-token');
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            err.status = 401;
            err.message = 'No auth token provided';
            next(err);
        } else {
            next();
        }
    });
}
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
    }

    SeekKeep.create(userData)
        .then(function (user) {
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
        })
        .catch((err) => {
            console.log(err);
            res.json({
                result: 'error'
            });
        });
})
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