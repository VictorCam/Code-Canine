const express = require("express");
const router = express.Router();
const cors = require("cors");
require("dotenv").config();
const connectsql = require("../server_connection");

const corsOptions = {
    origin: 'http://localhost:8080',
    credentials: true
}

router.use(cors(corsOptions));

const verify = require('./verify_token');

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

module.exports = router;