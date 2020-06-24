const express = require("express");
const router = express.Router();
const cors = require("cors");
const connectsql = require("../db_connection");
const jwt = require("jsonwebtoken");
var bodyParser = require('body-parser');
const fetch = require("node-fetch");

var app = express();

const verify = require('./verify_token');

var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false })

router.get("/post", (req, res) => {

    fetch("http://localhost:13377/test2").then(res => {
 //     // returns an array of values, instead of a string of comma-separated values
     raw = res.headers.raw();
     console.log("raw", raw);
    //  return raw.map((entry) => {
    //    console.log("entry",entry);
    //    const parts = entry.split(';');
    //    const cookiePart = parts[0];
    //    return cookiePart;
    //  });
//  }).then(function (cookiePart) {
//    return cookiePart.map((entry) => {
//        console.log("entry",entry);
//        const parts = entry.split('=');
//        const cook = parts[1];
//        return cook;
//      });
//    }).then(function (cook) {
//        console.log(cook[0]);


//    res.json({
//        posts: {
//            title: "my first post", 
//            description: "DATA THAT SHOULD NOT BE ACCESSED WITHOUT ACCESS!"
//        },
//        posts: {
//            title: "my seoncd post", 
//            description: "DATA THAT SHOULD NOT BE ACCESSED WITHOUT ACCESS!"
//        },
//    });
});
res.send("ok");
});

module.exports = router;