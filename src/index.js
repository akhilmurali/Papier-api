import express from 'express';
import mongoose from 'mongoose';
import router from './routes/router';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
dotenv.config();
let port = process.env.PORT || 4000;
let app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', router);

mongoose.Promise = global.Promise;

let startServer = function () {
    app.listen(port, () => {
        console.log('Server running on port ' + port);
    });
}
mongoose.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@ds245661.mlab.com:45661/capstone_db`, { useNewUrlParser: true })
    .then(() => {
        console.log('Connection established to database');
        startServer();
    }).catch((err) => {
        console.log(err);
        console.log('Error connecting to mongo db');
    });

