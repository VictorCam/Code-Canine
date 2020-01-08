const express = require("express");
const router = express.Router();
const cors = require("cors");
//const jwt = require("jsonwebtoken");
//const bcrpyt = require("bcrypt");
const User = require("./model");
//const test = require("./test.json");

router.use(cors());

router.get("/", function(req, res) {
  User.findAll()
    .then(users => {
      res.send(users);
    })
    .catch(err => {
      res.status(500).json({ err });
    });
});

router.get("/test", function(req, res) {
  res.send("GET test request route");
  console.log("testing route");
});

module.exports = router;
