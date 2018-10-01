process.env.NODE_ENV = "test";

//Require the dev-dependencies:
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../build/index");
let should = chai.should();

chai.use(chaiHttp);

describe("/GET book/books", () => {
    it("Should fetch 5 books in the collection", done => {
      chai
        .request(server)
        .get("/books")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("books");
          chai.assert(res.body.books.length, 5);
          done();
        });
    });
  
    it("Should fetch 5 books with an offset in the collection", done => {
      chai
        .request(server)
        .get("/books?offset=5")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("books");
          chai.assert(res.body.books.length, 5);
          done();
        });
    });
  
    it("Should fetch 1 book from the collection", done => {
      chai
        .request(server)
        .get("/book/5b7e97b4ba8e2818923d3c37")
        .end((err, res) => {
          if (err) throw err;
          res.should.have.status(200);
          res.body.should.have.property("book");
          chai.assert(res.body.book._id, '5b7e97b4ba8e2818923d3c37');
          done();
        });
    });
  
  });