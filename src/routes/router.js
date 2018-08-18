import express from 'express';
var controller = require('../controllers/authController');
var bookController = require('../controllers/bookController')
let router = express.Router();



//----------------------Sign Up----------------------------------------
router.post('/signup', controller.signup)
//-----------------------------Login ----------------------------------
router.post('/login', controller.login)


//------------------Add  Books----------------------------

router.post('/addBooks', bookController.addBooks)

//-----------------Get All Books----------------------
router.get('/getBooks', bookController.getBooks)

export default router;