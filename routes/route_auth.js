const express = require("express");
const cors = require("cors");
const connectsql = require("../server_connection");
const jwt = require("jsonwebtoken");
const bcrpyt = require("bcrypt");
const cookie = require("cookie");
require("dotenv").config();

//uncomment the origin on both cors option and /auth res.setHeader

var app = express();
const router = express.Router();

const corsOptions = {
  origin: 'http://localhost:8080',
  credentials: true
 }

router.use(cors(corsOptions));

router.post("/login", (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');

    const sql = "SELECT * FROM user_tables where user_tables.Name = ? AND user_tables.Password= ?";
    connectsql.query(sql,[req.body.username,req.body.password], function(err, rows, fields) {
      console.log("SQL username + pasword:", req.body.username, " ", req.body.password);
            if (rows.length === 1) {
                console.log(rows[0].ID);

                // var now = new Date();
                // var minutes = 1;
                // now.setTime(now.getTime() + (minutes * 60 * 1000));

                const token = jwt.sign({user_ID: rows[0].ID}, process.env.TOKEN_SECRET, {expiresIn: "24h"});
                res.setHeader('Set-Cookie', cookie.serialize('token', token, { httpOnly: true, /*maxAge: now,*/ sameSite: "strict"}));
                res.status(200).send(true);
            } 
            else {
                console.log("authentication failed"); //send  response of 401 for auth failed
                res.status(401).send(false);
            }
        })
})

router.use(cors());

module.exports = router;