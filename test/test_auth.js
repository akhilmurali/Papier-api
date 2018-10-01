process.env.NODE_ENV = "test";

//Require the dev-dependencies:
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../build/index");
let should = chai.should();

chai.use(chaiHttp);

describe("/POST login", () => {
  it("Authenticate users with proper credentials", done => {
    let user = {
      email: "anne@gmail.com",
      password: "passpass"
    };
    chai
      .request(server)
      .post("/login")
      .send(user)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property("auth").to.be.true;
        res.body.should.have.property("token");
        done();
      });
  });
  
  it("it should not allow user's access without valid authentication", done => {
    let user1 = {
      email: "khush@gmail.com",
      password: ""
    };
    chai
      .request(server)
      .post("/login")
      .send(user1)
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.have.property("auth").to.be.false;
        res.body.should.have.property("token");
        done();
      });
  });

  it("It should return user not found for unregistered users", done => {
    let user2 = {
      email: "akhil@gmail.com",
      password: "pass"
    };
    chai
      .request(server)
      .post("/login")
      .send(user2)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.have.property("auth").to.be.false;
        res.body.should.have.property("token");
        done();
      });
  });
});

describe("/POST signup", () => {
  it("it should allow users to signup", done => {
    let user = {
      name: "Anne Raju",
      isSeller: false,
      email: "anne@gmail.com",
      password: "passpass",
      address: "address",
      pincode: "500081",
      mobile: "8089878645"
    };
    chai
      .request(server)
      .post("/signup")
      .send(user)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property("auth").to.be.true;
        res.body.should.have.property("token");
        done();
      });
  });
});
