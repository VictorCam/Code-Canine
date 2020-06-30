const express = require("express");
const cors = require("cors");
const connectsql = require("../db_connection");
const jwt = require("jsonwebtoken");
const bcrpyt = require("bcrypt");
const bodyParser = require('body-parser');
const cookie = require("cookie");
require("dotenv").config();

var app = express();
const router = express.Router();

var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false })



var corsOptions = {
  origin: 'http://localhost:8080',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
 }

router.use(cors(corsOptions));
router.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers','Content-Type, Authorization, Set-Cookie');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});


router.post("/login", (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Set-Cookie');

    var username = req.body.username;
    var password = req.body.password;

    var sql = "SELECT * FROM user_tables where user_tables.Name = '" + username + "' AND user_tables.Password='" + password + "'";
    connectsql.query(sql, function (err, rows, fields) {
            if (rows.length === 1) {
                console.log(sql);
                console.log(rows[0].ID);
                const token = jwt.sign({user_ID: rows[0].ID}, process.env.TOKEN_SECRET, {expiresIn: "1s"});

                res.json(token);
            } 
            else {
                console.log(sql);
                console.log("authentication failed"); //send  response of 401 for auth failed
                res.send("error");
                // return;
            }
        })
})

router.get("/test", (req, res) => {
  console.log(req.headers.cookie);
  res.send("ok");
})

router.use(cors());

module.exports = router;