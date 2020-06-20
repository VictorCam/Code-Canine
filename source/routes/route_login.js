const express = require("express");
const router = express.Router();
const cors = require("cors");
const connectsql = require("../db_connection");
const jwt = require("jsonwebtoken");
const bcrpyt = require("bcrypt");
var bodyParser = require('body-parser');
const { result } = require("lodash");
var app = express();

var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false })

router.post("/login", (req, res) => {
    console.log("login point checked!");
    console.log(req.body.username);
    var username = req.body.username;
    console.log(req.body.password);
    var password = req.body.password;

    var sql = "SELECT * FROM user_tables where user_tables.Name = '" + username + "' AND user_tables.Password='" + password + "'";
    connectsql.query(sql, function (err, rows, fields) {
            if (rows.length === 1) {
                console.log(sql);
                const token = jwt.sign({username: username}, "donut", {expiresIn: "2m"});
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
1
module.exports = router;