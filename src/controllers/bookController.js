import Book from '../models/bookModel';

const getBooks = (req, res) => {
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
}

const getSingleBook = (req, res) => {
    Book.findOne({ _id: req.params.id })
        .then((book) => {
            res.status(200).json({ book, status: 'ok' });
        })
        .catch((err) => {
            res.status(500).json({ err, status: 'error' });
        });
}

export default { getSingleBook, getBooks };
