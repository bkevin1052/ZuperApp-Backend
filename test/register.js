let chai = require("chai");
let chaiHttp = require("chai-http");
const expect = require("chai").expect;
chai.use(chaiHttp);
const url = "http://localhost:2021";

describe("Register :", () => {
  it("should be correct", (done) => {
    chai
      .request(url)
      .post("/api/register")
      .send({
        username: "bkevin1052",
        password: "bkevin1052",
        email: "bkevin1052@gmail.com",
        surname: "Barrientos",
        name: "Kevin",
        name: "47045823",
      })
      .end((err, res) => {
        expect(res.body.mensaje).to.equals("Usuario registrado correctamente!");
        done();
      });
  });
});

describe("Log In Google :", () => {
  it("should be correct", (done) => {
    chai
      .request(url)
      .post("/api/loginGoogle")
      .send({
        username: "bkevin1052",
        email: "bkevin10552@gmail.com",
        lastName: "Barrientos",
        firstName: "Kevin",
      })
      .end((err, res) => {
        expect(res.body.mensaje).to.equals(
          "Usuario ya registrado, favor ingrese con el correo y password!"
        );
        done();
      });
  });
});

describe("Log In Google :", () => {
  it("should be correct", (done) => {
    chai
      .request(url)
      .post("/api/loginGoogle")
      .send({
        username: "bkevin1052",
        email: "bkevin1052@gmail.com",
        lastName: "Barrientos",
        firstName: "Kevin",
      })
      .end((err, res) => {
        expect(res.body.mensaje).to.equals(
          "Usuario ya registrado, favor ingrese con el correo y password!"
        );
        done();
      });
  });
});
