import User from '../models/userModel';
import rp from 'request-promise';


var jwt = require('express-jwt');
var url = "zenlab.eu.auth0.com/userinfo"


//-------------------------------Auth MiddleWare-------------------//
var auth = (req, res) => {
  
  var options = {
    url: 'https://zenlab.eu.auth0.com',
    headers: { 'authorization': 'Bearer ' + "", 'Content-Type': 'application/json' },
    path: '/userinfo',
    method: 'GET'
  }

  rp(options).then((response)=>{
    //Fetch user info from the database:
  console.log("Auth end point triggered. inside response promisea");
   res.json(response.body);
  }).catch((err)=>{
    console.log(err);
    res.json({authentication: "unauthorized"});
  });

}

export default { auth };

