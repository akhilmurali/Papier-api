import express from 'express';
import controller from '../controllers/authController';
import uberController from '../controllers/uberControllers';
let router = express.Router();

//----------------------Sign Up----------------------------------------
router.post('/signup', controller.signup);
//-----------------------------Login ----------------------------------
router.post('/login', controller.login );
//-----------------------------Uber API Routes-------------------------
router.get('/uber/oauth', uberController.uberOAuth);

router.get('/uber-redirect',uberController.getAccessToken);

router.post('/uber/requests/estimate', uberController.getEstimate);

//-----------------------------Uber API Routes-------------------------

//-------------------------INTEGRATION TEST ROUTES -------------------------------//

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
//-------------------------INTEGRATION TEST ROUTES -------------------------------//

export default router;