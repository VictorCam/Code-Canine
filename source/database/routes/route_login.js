const express = require("express");
const cors = require("cors");
const connectsql = require("../db_connection");
const jwt = require("jsonwebtoken");
const bcrpyt = require("bcrypt");
const bodyParser = require('body-parser');
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
                res.header("Access-Control-Allow-Origin", "*");
                const token = jwt.sign({user_ID: rows[0].ID}, process.env.TOKEN_SECRET, {expiresIn: "2m"});
                res.send(token);
            } 
            else {
                console.log(sql);
                console.log("authentication failed"); //send  response of 401 for auth failed
            }
        })
})

router.use(cors());

module.exports = router;