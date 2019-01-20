import express from 'express';
import uberController from '../controllers/uberControllers';
import bookController from '../controllers/bookController';
import authController from '../controllers/authController';
import multer from 'multer';
import path from 'path';
import bodyParser from 'body-parser';
import config from '../config';

let router = express.Router();

//------------------Add  Books----------------------------
if(config.env == 'test'){
    router.get('/book_upload', function (req, res, next) {
        res.render('index');
    });
}

router.use(bodyParser.urlencoded({
    extended: false
}));

var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, path.resolve('./uploads'))
    },
    filename: function (req, file, callback) {
        callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
});

let upload = multer({  storage: storage });

router.post('/book_upload', upload.single('file'), bookController.upload);

router.get('/auth', authController.auth);

//-----------------Get All Books--------------------//

router.get('/books', bookController.getBooks);

router.get('/book/:id', bookController.getSingleBook);

router.get('/book/review/:id', bookController.getReviews);

router.post('/book/review/:id', bookController.postReview);

//-----------------------------Uber API Routes---------------------------------//
router.get('/uber/oauth', uberController.uberOAuth);

router.get('/uber-redirect',uberController.getAccessToken);

router.post('/uber/requests/estimate', uberController.getEstimate);

router.post('/uber/requests', uberController.getRide);

router.get('/uber/requests/current', uberController.getCurrentRideStatus);

//-----------------------------Uber API Routes------------------------------------//

export default router;
