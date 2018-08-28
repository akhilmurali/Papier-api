import Book from '../models/bookModel';
import Review from '../models/reviewModel';
import fs from 'fs';

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

const upload = function (req, res) {
    let bookData = new Book();
    //--------cloudinary--------------
    let cloudinary = require('cloudinary');
    cloudinary.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.API_KEY,
        api_secret: process.env.API_SECRET
    });
    //----------get the path from server-----------
    let Originalpath = req.file.filename;
    let pathimages = path.resolve("./uploads/", Originalpath);

    //--------& put it in cloudinary-------
    cloudinary.v2.uploader.upload(pathimages,
        function (error, result) {
            if (error) {
                console.log(error);
            }
            bookData.path = result.url;
            //----------------------remove image from server-----------------//
            fs.unlink(pathimages, (err) => {
                if (err) {
                    console.log("failed to delete local image:" + err);
                } else {
                    console.log('successfully deleted ' + pathimages + ' local image');
                }
            });
            //----------get the cloudinary URL & save in db-------------------//
            bookData.description = req.body.description
            bookData.isbn = req.body.isbn
            bookData.name = req.body.name
            bookData.price = req.body.price
            bookData.title = req.body.title
            bookData.author = req.body.author
            bookData.quantity = req.body.quantity

            bookData.save(function (err) {
                if (err) return next(err)
                return res.send('ok');
            })
        });
}

export default { getSingleBook, getBooks, getReviews, postReview, upload };
