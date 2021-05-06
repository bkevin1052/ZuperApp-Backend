let chai = require("chai");
let chaiHttp = require("chai-http");
const expect = require("chai").expect;
chai.use(chaiHttp);
const url = "http://localhost:2021";

describe("Perfil :", () => {
  it("should be correct getperfil", (done) => {
    chai
      .request(url)
      .post("/api/getperfil")
      .send({ username: "bkevin1052" })
      .end((err, res) => {
        expect(res.body.username).to.equals("bkevin1052");
        done();
      });
  });
});

describe("Perfil :", () => {
  it("should be correct editperfil", (done) => {
    chai
      .request(url)
      .post("/api/editperfil")
      .send({
        username: "bkevin1052",
        email: "bkevin1052@gmail.com",
        name: "Kevin",
        surname: "Barrientos",
        phone: "47045823",
      })
      .end((err, res) => {
        expect(res.body.mensaje).to.equals("Actualizacion exitosa");
        done();
      });
  });
});

describe("Perfil :", () => {
  it("should be correct updateProfilePassword", (done) => {
    chai
      .request(url)
      .post("/api/updateProfilePassword")
      .send({
        username: "bkevin1052",
        inputNewPassword: "Kevin",
        inputPassword: "bkevin1052",
      })
      .end((err, res) => {
        expect(res.body.mensaje).to.equals("Contraseña antigua no coincide.");
        done();
      });
  });
});

describe("Perfil :", () => {
  it("should be correct updateProfilePassword", (done) => {
    chai
      .request(url)
      .post("/api/updateProfilePassword")
      .send({
        username: "bkevin1052",
        inputNewPassword: "Kevin",
        inputPassword: "bkevin1052",
      })
      .end((err, res) => {
        expect(res.body.mensaje).to.equals("Contraseña antigua no coincide.");
        done();
      });
  });
});
