import express from 'express';
import Book from '../models/bookModel';

var controller = require('../controllers/authController');
var bookController = require('../controllers/bookController');
var multer = require('multer');
let router = express.Router();
var ejs = require('ejs');
var fs = require('fs');
var path = require('path');

var multer = require('multer');

var bodyParser = require('body-parser');


//----------------------Sign Up----------------------------------------
router.post('/signup', controller.signup)
//-----------------------------Login ----------------------------------
router.post('/login', controller.login)


//------------------Add  Books----------------------------

router.get('/book_upload', function (req, res, next) {
    res.render('index');
})

console.log("using path.resolve---", path.resolve('./uploads'));
router.use(bodyParser.urlencoded({
    extended: false
}))


var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, path.resolve('./uploads'))
    },
    filename: function (req, file, callback) {
        callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

var upload = multer({
    storage: storage
})

router.post('/book_upload', upload.single('file'), function (req, res) {
    var bookData = new Book();

    //--------cloudinary--------------
    var cloudinary = require('cloudinary');
    cloudinary.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.API_KEY,
        api_secret: process.env.API_SECRET
    });
    //----------get the path from server-----------
    var Originalpath = req.file.filename;
    console.log("originalpath is ---", Originalpath);
    console.log("dir name----", __dirname);
    var pathimages = path.resolve("./uploads/", Originalpath);
    console.log("path----", pathimages);

    //--------& put it in cloudinary-------
    cloudinary.v2.uploader.upload(pathimages,
        function (error, result) {
            if (error) {
                console.log(error);
            }
            bookData.path = result.url;

            //-----------------remove image from server----------
            fs.unlink(pathimages, (err) => {
                if (err) {
                    console.log("failed to delete local image:" + err);
                } else {
                    console.log('successfully deleted ' + pathimages + ' local image');
                }
            });

            //----------get the cloudinary URL & save in db-------------

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


})


//-----------------Get All Books----------------------
router.get('/getBooks', bookController.getBooks)



export default router;