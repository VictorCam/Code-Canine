const express = require("express")
const cors = require("cors")
const connectsql = require("../server_connection")
const jwt = require("jsonwebtoken")
const bcrpyt = require("bcrypt")
const cookie = require("cookie")
require("dotenv").config()
const bodyParser = require("body-parser");

var app = express();
const router = express.Router();

const corsOptions = {
  origin: 'http://localhost:8080',
  credentials: true
}

router.use(cors(corsOptions));
const verify = require('./middleware/verify_token')

router.get("/posts", (req, res) => {
    var sql = "SELECT USER.ID, USER.Name, POST.POST_ID, POST.post FROM user_tables USER, user_post POST WHERE USER.ID = POST.ID"
    connectsql.query(sql, function (err, data) {
            if (!err) {
                res.status(200).send(data)
            } else {
                res.status(500).send("unable to load posts")
            }
    })
});

router.get("/username",verify, (req, res) => {
    console.log("POST ROUTE ID:", req.user_ID); //yay we can use this for MySQL
    var id = req.user_ID.toString()
    if(id == null) {
        res.status(401).send("failure");
    } 
    else {
        var sql = "SELECT Name FROM user_tables WHERE ID = ?"
        connectsql.query(sql, [id], function (err, data) {
                if (!err) {
                    var reply = {
                        Name: data[0].Name
                    }
                    res.status(200).send(reply)
                } 
                else {
                    res.status(500).send("unable to create post")
                }
            })
    }
});

router.post("/create_post",verify, (req, res) => { //do not forever to check if the post belongs to the user with a WHERE ID = req.user_ID
    res.setHeader("Access-Control-Allow-Origin","http://localhost:8080")
    res.setHeader("Access-Control-Allow-Credentials",true)

    var sql = "INSERT INTO user_post(ID, Post) VALUES(?, ?)"
    connectsql.query(sql, [req.user_ID, req.body.info], function (err, data) {
            if (!err) {
                var reply = { //object must be consistent with the POST ID (server headers)
                    POST_ID: data.insertId, 
                    ID: req.user_ID,
                    post: req.body.info
                }
                res.status(200).send(reply)
            } 
            else {
                res.status(500).send("unable to create post")
            }
        })
});

router.post("/update_post",verify, (req, res) => {
    res.setHeader("Access-Control-Allow-Origin","http://localhost:8080")
    res.setHeader("Access-Control-Allow-Credentials",true)


    var sql = "UPDATE user_post SET Post = (?) WHERE user_post.POST_ID = (?)"
    connectsql.query(sql, [req.body.info[0], req.body.info[1]], function (err, data) {
            if (!err) {
                console.log(data)
                var reply = {
                    post: req.body.info[0],
                    index: req.body.info[2] //TITLE NOT FROM SERVER
                }
                res.status(200).send(reply)
            } 
            else {
                res.status(500).send("unable to update post")
            }
        })
});

router.post("/delete_post",verify, (req, res) => {
    res.setHeader("Access-Control-Allow-Origin","http://localhost:8080")
    res.setHeader("Access-Control-Allow-Credentials",true)

    console.log("post id:", req.body.info[0])
    console.log("index id:", req.body.info[1])
    console.log("user id:", req.user_ID)
    var sql = "DELETE FROM user_post WHERE user_post.POST_ID = (?)"
    connectsql.query(sql, [req.body.info[0]], function (err, data) {
            if (!err) {
                res.status(200).send(req.body.info[1])
                console.log("DELETED POST!");
            } 
            else {
                res.status(500).send("unable to delete post")
            }
        })
});


module.exports = router;