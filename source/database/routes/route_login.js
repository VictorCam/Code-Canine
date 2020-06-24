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

router.post("/login", (req, res) => {
    var username = req.body.username;
    var password = req.body.password;

    var sql = "SELECT * FROM user_tables where user_tables.Name = '" + username + "' AND user_tables.Password='" + password + "'";
    connectsql.query(sql, function (err, rows, fields) {
            if (rows.length === 1) {
                console.log(sql);
                console.log(rows[0].ID);
                const token = jwt.sign({user_ID: rows[0].ID}, process.env.TOKEN_SECRET, {expiresIn: "2m"});
                res.redirect("/auth?token=" + token);
                // res.send(token);
                
            }
            else {
                console.log(sql);
                console.log("authentication failed"); //send  response of 401 for auth failed
            }
        })
})

router.get("/auth", (req, res) => {
  if(req.query.token != null) {
    console.log("auth", req.query.token);
    token = req.query.token;
    res.setHeader('Set-Cookie', cookie.serialize('bearer', "token", {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7 // 1 week
    }));
    res.send("ok");
    return;
  }
  else {
  res.send("ok p2")
  return;
  }
});

router.get('/test1', (req, res, next) => {
  return res.send(`<form method="POST" action="/test2"><button type=submit>LOGIN!!</button></form>`)
})

router.post('/test2', (req, res, next) => {
  res.setHeader('Set-Cookie', cookie.serialize('foo', 'bar', { httpOnly: true }))
  res.send("ok");
  return res.setHeader;
})


router.use(cors());

module.exports = router;