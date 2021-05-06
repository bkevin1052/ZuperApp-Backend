const { Router } = require("express");
const router = Router();

const path = require("path");
const crypto = require("crypto");
var jwt = require("jsonwebtoken");
var confJWT = require("./../jwt.config");
const ConfigCorreo = require("../correo/ConfigCorreo");
const ConfigCorreoGoogle = require("../correo/ConfigCorreoGoogle");
const { unlink } = require("fs-extra");
const User = require("../models/User");
const caracteres =
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

//Redis - Cache
/**************************************************/
const responseTime = require("response-time");
const redis = require("redis");
const axios = require("axios");
const client = redis.createClient();
/**************************************************/

login = router.post("/login", async (req, res) => {
  try {
    var username = req.body.username;
    var password = req.body.password;
    password = crypto.createHash("md5").update(password).digest("hex");

    if (username && password) {
      const user = await User.findOne({ username: req.body.username });
      if (user) {
        if (user.password == password) {
          const payload = {
            check: true,
          };
          const token = jwt.sign(payload, confJWT.llave, {
            expiresIn: 1440,
          });

          res.json({
            token: token,
            username: user.username,
            mensaje: "Autenticación correcta",
            codigo: "100",
          });
        } else {
          res.json({
            token: "",
            username: user.username,
            mensaje: "Usuario o contraseña incorrectos",
            codigo: "",
          });
        }
        res.end();
      } else {
        res.json({
          token: "",
          username: username,
          mensaje: "Usuario no registrado",
          codigo: "",
        });
        res.end();
      }
    } else {
      res.json({
        token: "",
        username: username,
        mensaje: "Usuario no registrado",
        codigo: "",
      });
      res.end();
    }
  } catch {
    res.json({
      token: "",
      username: username,
      mensaje: "Usuario no registrado",
      codigo: "",
    });
  }
});

register = router.post("/register", async (req, res) => {
  var username = req.body.username;
  var email = req.body.email;
  var name = req.body.name;
  var surname = req.body.surname;
  var phone = req.body.phone;
  var password = crypto
    .createHash("md5")
    .update(req.body.password)
    .digest("hex");
  const newUser = new User({ username, password, email, name, surname, phone });
  console.log(newUser);
  await newUser.save();
  res.json({
    token: "",
    username: newUser.username,
    mensaje: "Usuario registrado correctamente!",
    codigo: "100",
  });
  res.end();
});

loginGoogle = router.post("/loginGoogle", async (req, res) => {
  var username = req.body.email;
  var email = req.body.email;
  var name = req.body.firstName;
  var surname = req.body.lastName;
  var charsLength = caracteres.length;
  var randomBytes = crypto.randomBytes(10);
  var result = new Array(10);

  var cursor = 0;
  for (var i = 0; i < 10; i++) {
    cursor += randomBytes[i];
    result[i] = caracteres[cursor % charsLength];
  }

  var aleatorio = result.join("");
  var password = crypto.createHash("md5").update(aleatorio).digest("hex");

  const user = await User.findOne({ username: req.body.email });
  if (user) {
    res.json({
      token: "",
      username: user.username,
      mensaje: "Usuario ya registrado, favor ingrese con el correo y password!",
      codigo: "100",
    });
  } else {
    const newUser = new User({ username, password, email, name, surname });
    console.log(newUser);
    await newUser.save();
    ConfigCorreoGoogle(email, aleatorio);
    res.json({
      token: "",
      username: newUser.username,
      mensaje:
        "Usuario registrado correctamente, hemos enviado su password al correo registrado!",
      codigo: "100",
    });
  }

  res.end();
});

updatePassword = router.post("/updatePassword", async (req, res) => {
  var correo = req.body.email;

  var charsLength = caracteres.length;
  var randomBytes = crypto.randomBytes(10);
  var result = new Array(10);

  var cursor = 0;
  for (var i = 0; i < 10; i++) {
    cursor += randomBytes[i];
    result[i] = caracteres[cursor % charsLength];
  }

  var aleatorio = result.join("");
  var pass = crypto.createHash("md5").update(aleatorio).digest("hex");

  const user = await User.findOne({ email: req.body.email });

  if (user) {
    let doc = await User.findOneAndUpdate(
      { email: user.email },
      { password: pass }
    );
    ConfigCorreo(correo, aleatorio);
    res.json({
      token: "",
      username: user.username,
      mensaje:
        "Por favor revisar su correo electrónico, si no sale en principal también revisar Spam.",
      codigo: "201",
    });
  } else {
    res.json({
      token: "",
      username: correo,
      mensaje: "No se encuentra el correo ingresado, ingresar nuevamente.",
      codigo: "",
    });
  }
  res.end();
});

getperfil = router.post("/getperfil", async (req, res) => {
  const user = await User.findOne({ username: req.body.username });

  if (user) {
    res.json({
      username: user.username,
      name: user.name,
      surname: user.surname,
      phone: user.phone,
      email: user.email,
    });
  }

  res.end();
});

editperfil = router.post("/editperfil", async (req, res) => {
  const user = await User.findOne({ username: req.body.username });

  if (user) {
    let doc = await User.findOneAndUpdate(
      { username: req.body.username },
      {
        email: req.body.email,
        name: req.body.name,
        surname: req.body.surname,
        phone: req.body.phone,
      }
    );

    res.json({ mensaje: "Actualizacion exitosa", username: req.body.username });
    res.end();
  }

  res.end();
});

updateProfilePassword = router.post(
  "/updateProfilePassword",
  async (req, res) => {
    var newPass = crypto
      .createHash("md5")
      .update(req.body.inputNewPassword)
      .digest("hex");

    const user = await User.findOne({ username: req.body.username });

    var pass = user.password;
    var oldPass = crypto
      .createHash("md5")
      .update(req.body.inputPassword)
      .digest("hex");

    if (pass == oldPass) {
      if (user) {
        let doc = await User.findOneAndUpdate(
          { username: user.username },
          { password: newPass }
        );
        res.json({
          token: "",
          username: user.username,
          mensaje: "Actualizacion de contraseña correctamente.",
          codigo: "201",
        });
      } else {
        res.json({
          token: "",
          username: user.username,
          mensaje: "No se encuentra el usuario ingresado, ingresar nuevamente.",
          codigo: "",
        });
      }
    } else {
      res.json({
        token: "",
        username: user.username,
        mensaje: "Contraseña antigua no coincide.",
        codigo: "406",
      });
    }
    res.end();
  }
);

module.exports = router;
