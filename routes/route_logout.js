const express = require("express");
const router = express.Router();
const cors = require("cors");
require("dotenv").config();

const corsOptions = {
    origin: 'http://localhost:8080',
    credentials: true
}

router.use(cors(corsOptions));

const verify = require('./middleware/verify_token');

router.get("/logout",verify, (req, res) => {
    res.clearCookie("token");
    res.status(200).send(false); //properly logged out (I think I might need to reset data after this in my store?)
});

router.post("/delete_post", (req, res) => {
    // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    // res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
    res.setHeader('Access-Control-Allow-Credentials', true); // If needed
    res.setHeader('Access-Control-Allow-Origin', 'localhost:8080');
    // res.setHeader("Access-Control-Allow-Headers", "*")

    console.log("data", req.body)
    // console.log("req", req.headers)
    // console.log("res", res.headers)
    // console.log("user is", )
    // var sql = "DELETE FROM user_post WHERE user_post.POST_ID = (?)"
    // connectsql.query(sql, [req.params.id], function (err, data) {
    //         if (!err) {;
    //             res.status(200).send("successfully deleted")
    //             console.log("DELETED POST!");
    //         } else {
    //             console.log("something went wrong for deleting a post");
    //         }
    //     })
    res.status(200).send("successful")
});


module.exports = router;