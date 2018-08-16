import express from 'express';
import Book from '../models/bookModel';

let router = express.Router();
//console.log(Book);

router.get('/book', (req, res) => {
    Book.find({})
        .then((books) => {
            res.status(200).json({ books });
        })
        .catch((err) => {
            res.status(500).json({ err })
        });
});

router.post('/book', (req, res) => {
    Book.create(req.body)
        .then((book) => {
            res.status(200).json({ book, msg: 'successfully added book to the database' });
        })
        .catch((err) => {
            res.status(500).json({ err, msg: 'Error inserting book into the database' });
        });
});

export default router;