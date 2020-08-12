const express = require("express");
const cors = require("cors");
const connectsql = require("../server_connection");
const jwt = require("jsonwebtoken");
const bcrpyt = require("bcrypt");
const cookie = require("cookie");
require("dotenv").config();

var app = express();
const router = express.Router();

const corsOptions = {
  origin: 'http://localhost:8080',
  credentials: true
}

router.use(cors(corsOptions));
const verify = require('./verify_token');
const { route } = require("./route_ID");

router.get("/posts",verify, (req, res) => {
    var sql = "SELECT USER.ID, USER.Name, POST.POST_ID, POST.post FROM user_tables USER, user_post POST WHERE USER.ID = POST.ID"
    connectsql.query(sql, function (err, data) {
            if (!err) {
                res.send(data)
            } else {
                res.send("error")
            }
    })
    // res.send("everything is epiicccc")
});

//INSERT INTO `user_post` (`ID`, `Post`) VALUES ('1', 'pizza is yummy!') 

router.post("/create_post", (req, res) => {
    // console.log(req.body.ID)
    // console.log(req.body.Post)
    var sql = "INSERT INTO user_post(ID, Post) VALUES(?, ?)"
    connectsql.query(sql, [req.body.ID.toString(), req.body.post.toString()], function (err, data) {
            if (!err) {
                res.status(200);
                console.log("CREATED POST!");
            } else {
                console.log("something went wrong during sign up");
            }
        })
    res.status(200).send("post created")
});

//UPDATE user_post SET Post = 'wowiezoiwe' WHERE user_post.POST_ID = 9
router.put("/update_post", (req, res) => {
    // console.log("content:",req.body.content)
    // console.log("postID :",req.body.content)
    var sql = "UPDATE user_post SET Post = (?) WHERE user_post.POST_ID = (?)"
    connectsql.query(sql, [req.body.content, req.body.ID], function (err, data) {
            if (!err) {
                res.status(200)
                console.log(sql)
                console.log("UPDATED POST!")
            } else {
                console.log("something went wrong during sign up")
                res.status(200)
            }
        })
});

router.delete("/delete_post/:id", (req, res) => {
    var sql = "DELETE FROM user_post WHERE user_post.POST_ID = (?)"
    connectsql.query(sql, [req.params.id], function (err, data) {
            if (!err) {
                res.status(200);
                console.log("DELETED POST!");
            } else {
                console.log("something went wrong during sign up");
            }
        })

    // res.status(200).send("post created")
    // console.log("params:", req.params.id)
    // res.status(200).send("post deleted")
});


module.exports = router;