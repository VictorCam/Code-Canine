const express = require("express");
const router = express.Router();
const cors = require("cors");
const connectsql = require("../database/db_connection");
const jwt = require("jsonwebtoken");
const bcrpyt = require("bcrypt");
var bodyParser = require('body-parser');
const { result } = require("lodash");
var app = express();
require("dotenv").config();

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
                const token = jwt.sign({username: username}, process.env.TOKEN_SECRET, {expiresIn: "2m"});
                res.status(200).header('auth-token', token).send("successful login");
                // var decoded = jwt.verify(token, password);
                // console.log(decoded);
            } else {
                console.log(sql);
                console.log("something went wrong in login"); //send  response of 401 for auth failed
            }
        })
})

router.use(cors());

module.exports = router;