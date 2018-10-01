process.env.NODE_ENV = "test";

//Require the dev-dependencies:
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../build/index");
let should = chai.should();

chai.use(chaiHttp);

describe("/GET book/review/5b7e97b4ba8e2818923d3c37", () => {
    it("Should fetch all reviews in the collection pertaining to a book", done => {
        chai
            .request(server)
            .get("/book/review/5b7e97b4ba8e2818923d3c37")
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property("reviews");
                done();
            });
    });
});