import Book from '../models/bookModel';
import Review from '../models/reviewModel';

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

const postReview = (req, res)=>{
    console.log(req.params.id);
    req.body.book_id = req.params.id;
    Review.create(req.body)
        .then((review)=>{
            res.status(200).json({status: 'ok'});
        })
        .catch((err)=>{
            res.status(500).json({status: err, err});
        });
}

const getReviews = (req, res)=>{
    Review.find({book_id: req.params.id})
        .then((reviews)=>{
            res.status(200).json({status: 'ok', reviews});
        })
        .catch((err)=>{
            res.status(500).json({status: 'err', err});
        });
}

export default { getSingleBook, getBooks, getReviews, postReview };
