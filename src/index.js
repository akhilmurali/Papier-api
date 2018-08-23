import express from 'express';
import mongoose from 'mongoose';
import router from './routes/router';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
var morgan = require('morgan');

var cors = require('cors');

let config = require('./config');
dotenv.config();
let port = process.env.PORT || 5000;
let app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cors({credentials: true, origin: true}));
app.use('/', router);

mongoose.Promise = global.Promise;

let startServer = function () {
    app.listen(port, () => {
        console.log('Server running on port ' + port);
    });
}
startServer();
app.set('view engine', 'ejs')
mongoose.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@ds245661.mlab.com:45661/capstone_db`, {
        useNewUrlParser: true
    })
    .then(() => {
        console.log('Connection established to database');
        
    }).catch((err) => {
        console.log(err);
        console.log('Error connecting to mongo db');
    });
if (config.env == 'test') {
    //use morgan to log at command line
    app.use(morgan('combined')); //'combined' outputs the Apache style LOGs
}

console.log("end of index.js");

module.exports = app;
