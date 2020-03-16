const express = require("express");
const router = express.Router();
const cors = require("cors");
//const jwt = require("jsonwebtoken");
//const bcrpyt = require("bcrypt");
const User = require("../models/user_model");
//const Submission = require("../models/submission_model");
//const test = require("./test.json");

router.use(cors());

//Submission.belongsTo(User);

router.get("/", function(req, res) {
  User.findAll()
    .then(users => {
      res.send(users);
    })
    .catch(err => {
      console.log("error");
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

router.get("/signup", function() {
  const data = {
    ID: 6,
    Name: "mike",
    Password: "SIKE11"
  };

  let { ID, Name, Password } = data;

  User.create({
    ID,
    Name,
    Password
  })
    .then(User)
    .catch(err => console.log(err));
});

/*router.get('/signup', (req, res) => {
  const data = {
    ID: 5,
    Name: "Donut",
    Password: "robux"
  }

  let { ID, Name, Password } = data;

  User.create({
    ID,
    Name,
    Password
  })
  .then(User)
  .catch(err => console.log(err));
}*/

module.exports = router;
