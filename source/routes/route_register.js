const express = require("express");
const router = express.Router();
const cors = require("cors");
const connectsql = require("../database/db_connection");
const jwt = require("jsonwebtoken");
const bcrpyt = require("bcrypt");
var bodyParser = require('body-parser')
var app = express();

var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false })

router.post("/signup", (req, res) => {
    console.log("sucessful signup");
    console.log(req.body.username);
    console.log(req.body.password);

    var sql = "INSERT INTO user_tables(Name, Password) VALUES(?, ?)";

    connectsql.query(sql, [req.body.username, req.body.password], function (err, data) {
            if (!err) {
                res.status(200);
                console.log("sign up success!");
            } else {
                console.log("something went wrong during sign up");
            }
        })
})

router.use(cors());

module.exports = router;