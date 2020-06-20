const express = require("express");
const router = express.Router();
const cors = require("cors");
const connectsql = require("../database/db_connection");
const jwt = require("jsonwebtoken");
var bodyParser = require('body-parser');
var app = express();

const verify = require('./verify_token');

var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false })

router.get("/posts", verify, (req, res) => {
    res.json({
        posts: {
            title: "my first post", 
            description: "DATA THAT SHOULD NOT BE ACCESSED WITHOUT ACCESS!"
        }
    });
});

module.exports = router;