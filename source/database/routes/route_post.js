const express = require("express");
const router = express.Router();
const cors = require("cors");
const connectsql = require("../db_connection");
const jwt = require("jsonwebtoken");
var bodyParser = require('body-parser');
const cookie = require("cookie");
require("dotenv").config();

var app = express();

// var corsOptions = {
//     origin: 'http://localhost:8080',
//     methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//     credentials: true
//    }
  
//   router.use(cors(corsOptions));

const verify = require('./verify_token');

var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false })

router.get("/auth", (req, res) => {
    //need access to credentials only in here
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');

    console.log("req",req.query.ID);

    console.log(jwt.verify(req.query.ID,process.env.TOKEN_SECRET, (err,user) => {
        if(err) {
            var access = "DENIED"
            console.log(access);
        }
        else {
            var access = "APPROVED"
            console.log(access);
            const token = jwt.sign({user_ID: user.user_ID}, process.env.TOKEN_SECRET, {expiresIn: "1m"});

            res.setHeader('Set-Cookie', cookie.serialize('bearer', token, {
                httpOnly: true,
                maxAge: 60 * 60 * 24 * 7 // 1 week
                }));
            }
        res.send(access);
    }))
});

router.get("/post", (req, res) => {
    res.send("data");
});



module.exports = router;