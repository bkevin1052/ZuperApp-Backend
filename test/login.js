let chai = require("chai");
let chaiHttp = require("chai-http");
const expect = require("chai").expect;
chai.use(chaiHttp);
const url = "http://localhost:2021";

describe("Login :", () => {
  it("should be correct", (done) => {
    chai
      .request(url)
      .post("/api/login")
      .send({ username: "bkevin1052", password: "0CWUiWR0wg" })
      .end((err, res) => {
        expect(res.body.mensaje).to.equals("Usuario o contraseña incorrectos");
        done();
      });
  });
});

describe("Login :", () => {
  it("should be correct", (done) => {
    chai
      .request(url)
      .post("/api/login")
      .send({ username: "bkevin10152", password: "bkevin1052" })
      .end((err, res) => {
        expect(res.body.mensaje).to.equals("Usuario no registrado");
        done();
      });
  });
});
