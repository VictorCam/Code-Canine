const express = require("express");
const router = express.Router();
const cors = require("cors");
const connectsql = require("../db_connection");

//const jwt = require("jsonwebtoken");
//const bcrpyt = require("bcrypt");


router.get("/", (req, res) => {
  connectsql.query("SELECT * from user_tables", (err, rows, fields) => {
    if(!err) {
      res.status(200).send(rows);
    }
    else {
      console.log(err);
    }
  })
});

router.get("/profile/:id", function(req, res) {
  const id = req.params.id;
  connectsql.query('SELECT * FROM  user_tables WHERE ID = ' + connectsql.escape(id) , (err, rows, fields) => {
    if(!err) {
      res.status(200).send(rows[0]);
    }
    else {
      console.log(err);
    }
  });
})

router.get("/profile/*", function(req, res) {
  res.status(500).send("ERROR");
});

router.get("*", function(req, res) {
  res.status(500).send("ERROR");
});

router.use(cors());

module.exports = router;
