process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let User = require('../build/models/userModel');

//Require the dev-dependencies:
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../build/index');
let should = chai.should();

chai.use(chaiHttp);

 describe('/POST login', () => {
    
    it('it should not POST without auth', (done) => {
 
    let user = {
          email: "khush@gmail.com",
          password: "khush123"
      }
      chai.request(server)
          .post('/login')
          .send(user)
          .end((err, res) => {
              res.should.have.status(200);
              res.body.should.have.property('auth').to.be.true;
              res.body.should.have.property('token') 
            done();
          });
    
        });
});

