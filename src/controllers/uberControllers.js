import Uber from 'node-uber';
import dotenv from 'dotenv';
import rp from 'request-promise';
dotenv.config();

let uber = new Uber({
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    server_token: process.env.CLIENT_SECRET,
    redirect_uri: 'http://localhost:5000/uber-redirect',
    name: 'Papier',
    language: 'en_US',
    sandbox: true,
    proxy: ''
});


const uberOAuth = (req, res) => {
    var url = uber.getAuthorizeUrl(['history', 'profile', 'request', 'places']);
    res.redirect(url);
}

const getAccessToken = (req, res) => {
    uber.authorizationAsync({ authorization_code: req.query.code })
        .spread(function (access_token, refresh_token, authorizedScopes, tokenExpiration) {
            // redirect the user back to your actual app
            res.json({ access_token: access_token, scope: authorizedScopes, expiry: tokenExpiration, refresh_token: refresh_token });
        })
        .error(function (err) {
            console.error(err);
        });
}

const getEstimate = (req, res) => {
    if (req.headers['uber-token'] == '') {
        res.json({ err, msg: 'uber access token not provided' });
    }
    let rpOptions = {
        method: 'POST',
        uri: `https://sandbox-api.uber.com/v1.2/requests/estimate?access_token=${req.headers['uber-token']}`,
        body: req.body,
        json: true
    };
    rp(rpOptions)
        .then((response)=>{
             res.status(200).json({fare: response.fare.breakdown[0].value, status: 'successful', response});   
        })
        .catch((err)=>{
            console.log(err);
            res.status(500).json({err, msg: 'error  retrieving data from uber'});
        });
}


const getRide = (req, res)=>{
    if (req.headers['uber-token'] == '') {
        res.json({ err, msg: 'uber access token not provided' });
    }
    let rpOptions = {
        method: 'POST',
        uri: `https://sandbox-api.uber.com/v1.2/requests?access_token=${req.headers['uber-token']}`,
        body: req.body,
        json: true
    };
    rp(rpOptions)
        .then((response)=>{
             res.status(200).json({response});   
        })
        .catch((err)=>{
            console.log(err);
            res.status(500).json({err, msg: 'error  retrieving data from uber'});
        });
};

const getCurrentRideStatus = (req, res)=>{
    if (req.headers['uber-token'] == '') {
        res.json({ err, msg: 'uber access token not provided' });
    }
    let rpOptions = {
        method: 'GET',
        uri: `https://sandbox-api.uber.com/v1.2/requests/current?access_token=${req.headers['uber-token']}`
    };
    rp(rpOptions)
        .then((response)=>{
             res.status(200).json({response});   
        })
        .catch((err)=>{
            console.log(err);
            res.status(500).json({err, msg: 'error  retrieving data from uber'});
        });
}

export default { getAccessToken, uberOAuth, getEstimate, getRide, getCurrentRideStatus };
