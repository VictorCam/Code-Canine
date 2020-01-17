const express = require("express");
const router = express.Router();
const cors = require("cors");
//const jwt = require("jsonwebtoken");
//const bcrpyt = require("bcrypt");
const User = require("../models/user_model");
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

router.get("/profile/:id", function(req, res) {
  User.findByPk(req.params.id)
    .then(users => {
      res.send(users);
    })
    .catch(err => {
      console.log("error");
      res.status(500).json({ err });
    });
});

router.get("/profile/*", function(req, res) {
  res.status(500).json("ERROR");
});

router.get("*", function(req, res) {
  res.status(500).json("ERROR");
});

module.exports = router;
