const express = require("express");
const router = express.Router();
const cors = require("cors");
const connectsql = require("../server_connection");
const jwt = require("jsonwebtoken");
var bodyParser = require('body-parser');
const cookie = require("cookie");
require("dotenv").config();

var app = express();

const corsOptions = {
    origin: 'http://localhost:8080',
    credentials: true
}

router.use(cors(corsOptions));

const verify = require('./verify_token');

var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false })


router.get("/post",verify, (req, res) => {
    console.log("POST ROUTE ID:", req.user_ID); //yay we can use this for MySQL
    var id = req.user_ID.toString()
    res.status(200).send(id);
});

router.get("/b_cookies", (req, res) => {
    if(req.headers.cookie == null) { //check if cookie exist
        return res.status(200).send("guest");
      }

    var key = getCookieValue('token', req);

    if(key) {
    res.clearCookie('token');
    res.status(200).send("killed cookies :)")
    }
    else {
        res.status(200).send("guest")
    }
});

function getCookieValue(a,req) {
    var b = req.headers.cookie.match('(^|;)\\s*' + a + '\\s*=\\s*([^;]+)');
    return b ? b.pop() : '';
  }

module.exports = router;