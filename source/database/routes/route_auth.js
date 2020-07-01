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

const corsOptions = {
  origin: 'http://localhost:8080',
  credentials: true
 }

router.use(cors(corsOptions));

router.post("/login", (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');

    var sql = "SELECT * FROM user_tables where user_tables.Name = ? AND user_tables.Password= ?";
    connectsql.query(sql,[req.body.username,req.body.password],function (err, rows, fields) {

      console.log("SQL username + pasword:", req.body.username, " ", req.body.password);

            if (rows.length === 1) {
                console.log(rows[0].ID);
                const token = jwt.sign({user_ID: rows[0].ID}, process.env.TOKEN_SECRET, {expiresIn: "24h"});
                app.set('token', token);
                res.json("successful login");
            } 
            else {
                console.log("authentication failed"); //send  response of 401 for auth failed
                res.send("error");
            }
        })
})

router.get("/auth", (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');

  if(app.get('token')) {
    var message = "SUCCESS";

    var now = new Date();
    var minutes = 1;
    now.setTime(now.getTime() + (minutes * 60 * 1000));
    
    res.setHeader('Set-Cookie', cookie.serialize('token', app.get('token'), {
      httpOnly: true,
      // maxAge: now,
      sameSite: "strict"
      }));
    app.set('token', null);
  }
  else {
    var message = "FAILIURE";
  }

  console.log("AUTHORIZATION: ", message);
  res.send(message);
});

router.use(cors());

module.exports = router;