import express from 'express';
var controller = require('../controllers/authController');
let router = express.Router();


//----------------------Sign Up----------------------------------------
router.post('/signup', controller.signup)
//-----------------------------Login ----------------------------------
router.post('/login', controller.login )




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