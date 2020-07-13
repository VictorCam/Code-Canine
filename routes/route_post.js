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
    if(id) {
        res.status(200).send({id:id, bool:true})
    }
    else {
        res.status(200).send({bool:false})
    }
});


module.exports = router;