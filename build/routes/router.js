'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var controller = require('../controllers/authController');
var bookController = require('../controllers/bookController');
var router = _express2.default.Router();

//----------------------Sign Up----------------------------------------
router.post('/signup', controller.signup);
//-----------------------------Login ----------------------------------
router.post('/login', controller.login);

//------------------Add  Books----------------------------

router.post('/addBooks', bookController.addBooks);

//-----------------Get All Books----------------------
router.get('/getBooks', bookController.getBooks);

exports.default = router;
//# sourceMappingURL=router.js.map