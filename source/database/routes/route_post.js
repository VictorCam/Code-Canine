const express = require("express");
const router = express.Router();
const cors = require("cors");
const connectsql = require("../db_connection");
const jwt = require("jsonwebtoken");
var bodyParser = require('body-parser');
const cookie = require("cookie");

var app = express();

const verify = require('./verify_token');

var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false })

router.get("/post", (req, res) => {
    //need access to credentials only in here
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');


    // res.setHeader('credentials', true);
    res.setHeader('Set-Cookie', cookie.serialize('bearer', "tok", {
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 7 // 1 week
        }));


    res.json({
        posts: {
            title: "my first post", 
            description: "DATA THAT SHOULD NOT BE ACCESSED WITHOUT ACCESS!"
        },
        posts: {
            title: "my seoncd post", 
            description: "DATA THAT SHOULD NOT BE ACCESSED WITHOUT ACCESS!"
        },
    });
});

module.exports = router;