import express from 'express';
import mongoose from 'mongoose';
import router from './routes/router';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

let morgan = require('morgan');
let cors = require('cors');
let config = require('./config');
dotenv.config();

let app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(cors({ credentials: true, origin: true }));

app.use('/', router);

mongoose.Promise = global.Promise;

app.listen(config.port, () => {
    console.log('Server running on port ' + config.port);
});


mongoose.connect(process.env.db, { useNewUrlParser: true })
    .then(() => {
        console.log('Connection established to database');
    }).catch((err) => {
        console.log(err);
        console.log('Error connecting to mongo db');
    });
//Use morgan to log at command line    
if (config.env == 'test') {
    app.use(morgan('combined')); 
    app.set('view engine', 'ejs');
}

export default app;
