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

// router.use(function (req, res, next) {
//   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080/');
//   res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE');
//   res.setHeader('Access-Control-Allow-Headers','X-Requested-With, Content-type');
//   res.setHeader('Access-Control-Allow-Credentials', false);
//   next();
// });


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
                
                // console.log(req.session.user);
                // res.setHeader('Set-Cookie', cookie.serialize('bearer', token, {
                //   httpOnly: true,
                //   maxAge: 60 * 60 * 24 * 7 // 1 week
                //   }));
                const body = { a: "work" };
                res.json(body);
            } 
            else {
                console.log(sql);
                console.log("authentication failed"); //send  response of 401 for auth failed
                const body = { a: "fail" };
                res.send(body);
                // return;
            }
        })
})

router.post("/test", (req, res) => {
//   const fetchData = async () => {
//     await fetch('/login')
//         .then(res => res.json())
//         .then(login => setKey(login), () =>
//             console.log('login fetched...', login));
if(null != null) {

const body = { a: "work" };
// }
res.send(body);
}
else {
  const body = { a:"poo"};
  res.send(body);
}

  // try {
  // res.setHeader('Set-Cookie', cookie.serialize('bearer', "tok", {
  //   httpOnly: true,
  //   maxAge: 60 * 60 * 24 * 7 // 1 week
  //   }));
  //   res.send("ok");
  // }
  // catch {
  //   res.send("error");
  // }
})

router.use(cors());

module.exports = router;