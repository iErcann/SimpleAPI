const jwt = require("jsonwebtoken");
const config = require("../config.js");
const db = require("../models");


const verifyToken = (req, res, next) => {
  let token = req.header('authorization').split(" ")[1];
  console.log(req.header('authorization'));
  //let token = req.session.token;
  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    req.userId = decoded.id;
    next();
  });
};



module.exports = {
  verifyToken
};
