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
const test = require('./test')
const { json } = require("body-parser")

router.get("/posts",verify, (req, res) => {
    var sql = "SELECT USER.ID, USER.Name, POST.POST_ID, POST.post FROM user_tables USER, user_post POST WHERE USER.ID = POST.ID"
    connectsql.query(sql, function (err, data) {
            if (!err) {
                res.send(data)
            } else {
                res.send("error")
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
                    console.log(reply)
                    res.status(200).send(reply)
                } else {
                    console.log("something went wrong creating post")
                }
            })
    }
});

router.post("/create_post",verify, (req, res) => {
    res.setHeader("Access-Control-Allow-Origin","http://localhost:8080")
    res.setHeader("Access-Control-Allow-Credentials",true)

    var sql = "INSERT INTO user_post(ID, Post) VALUES(?, ?)"
    connectsql.query(sql, [req.user_ID, req.body.info], function (err, data) {
            if (!err) {
                var reply = { //object must be consistent with the POST ID
                    POST_ID: data.insertId, 
                    ID: req.user_ID,
                    post: req.body.info
                }
                res.status(200).send(reply)
            } else {
                console.log("something went wrong creating post")
            }
        })
});

router.post("/update_post", (req, res) => {
    res.setHeader("Access-Control-Allow-Origin","http://localhost:8080")
    res.setHeader("Access-Control-Allow-Credentials",true)
    // console.log("test:",req.headers)
    

    // console.log("postID :",req.body.info[0], req.body.info[1])
    var sql = "UPDATE user_post SET Post = (?) WHERE user_post.POST_ID = (?)"
    connectsql.query(sql, [req.body.info[0], req.body.info[1]], function (err, data) {
            if (!err) {
                res.status(200)
                console.log("UPDATED POST!")
            } else {
                console.log("something went wrong updating a post")
                res.status(200)
            }
        })
    res.status(200).send("nice job")
});

router.post("/delete_post",verify, (req, res) => {
    res.setHeader("Access-Control-Allow-Origin","http://localhost:8080")
    res.setHeader("Access-Control-Allow-Credentials",true)

    console.log("post id:", req.body.post)
    console.log("user id:", req.user_ID)
    var sql = "DELETE FROM user_post WHERE user_post.POST_ID = (?)"
    connectsql.query(sql, [req.body.post], function (err, data) {
            if (!err) {;
                res.status(200).send("successfully deleted")
                console.log("DELETED POST!");
            } else {
                console.log("something went wrong for deleting a post");
            }
        })
//     var cool = {
//         "working": "successful"
//     }
// res.status(200).send(cool)
});


module.exports = router;