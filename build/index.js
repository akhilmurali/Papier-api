'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _router = require('./routes/router');

var _router2 = _interopRequireDefault(_router);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var morgan = require('morgan');

var config = require('./config');
_dotenv2.default.config();
var port = process.env.PORT || 5000;
var app = (0, _express2.default)();
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({
    extended: true
}));
app.use('/', _router2.default);

_mongoose2.default.Promise = global.Promise;

var startServer = function startServer() {
    app.listen(port, function () {
        console.log('Server running on port ' + port);
    });
};
startServer();
app.set('view engine', 'ejs');
_mongoose2.default.connect('mongodb://' + process.env.DB_USER + ':' + process.env.DB_PASSWORD + '@ds245661.mlab.com:45661/capstone_db', {
    useNewUrlParser: true
}).then(function () {
    console.log('Connection established to database');
}).catch(function (err) {
    console.log(err);
    console.log('Error connecting to mongo db');
});
if (config.env == 'test') {
    //use morgan to log at command line
    app.use(morgan('combined')); //'combined' outputs the Apache style LOGs
}

console.log("end of index.js");

module.exports = app;
//# sourceMappingURL=index.js.map