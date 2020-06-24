const express = require("express");
const cors = require("cors");
const connectsql = require("../db_connection");
const jwt = require("jsonwebtoken");
const bcrpyt = require("bcrypt");
const bodyParser = require('body-parser');
const jwt_decode = require('jwt-decode');
const cookie = require('cookie');
const fetch = require('node-fetch');
var http = require('http');

const cookieParser = require("cookie-parser");

require("dotenv").config();

// var checker = require("ccookie");

var app = express();

const router = express.Router();
app.use(cookieParser())

var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false })



router.get("/login", function (req, res, next) {
    var username = req.body.username;
    var password = req.body.password;


    // console.log("test:", req.query);
    // console.log("noob: ", req.query.name);

    res.setHeader('Set-Cookie', cookie.serialize('name', "boob", {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7 // 1 week
    }));

//   res.cookie('nameOfCookie', 'cookieValue', {
//   maxAge: 60 * 60 * 1000, // 1 hour
//   httpOnly: true,
//   secure: true,
//   sameSite: true,
// })

// console.log(res.cookies.);

  // fetch("http://localhost:13377/login").then(res => {
  // //     // returns an array of values, instead of a string of comma-separated values
  //     console.log(res.headers.raw());
  // });

  res.status(200).send("ok");

    // var sql = "SELECT * FROM user_tables where user_tables.Name = '" + req.query.name + "' AND user_tables.Password='" + req.query.password + "'";
    // connectsql.query(sql, function (err, rows, fields) {
    //         if (rows.length === 1) {
    //             console.log(sql);
    //             console.log(rows[0].ID);
    //             const token = jwt.sign({P_id: rows[0].ID, P_username: req.query.name}, process.env.TOKEN_SECRET, {expiresIn: "2m"});



    //             res.setHeader('Set-Cookie', cookie.serialize('name', token, {
    //               httpOnly: true,
    //               maxAge: 60 * 60 * 24 * 7 // 1 week
    //             }));

    //             res.send("ok");
    //             // res.status(200).cookie('stickyAccessJwt', token, cookieOptions).send('well done')

    //             // res.setHeader('set-cookie', cookie.serialize('foo', 'bar', { httpOnly: true }))
    //             // console.log(res.headersSent);
    //             // res.redirect("/setuser");
    //             // res.redirect("")
    //             // res.redirect("/sscookie?username=" + theuser + "&id=" + theid);
    //             // res.redirect("/setuser?token=" + token);

    //         } 
    //         else {
    //             console.log(sql);
    //             console.log("authentication failed"); //send  response of 401 for auth failed
    //             res.end();
    //         }
    //     })
})
router.use(cors());

module.exports = router;