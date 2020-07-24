const express = require("express");
const router = express.Router();
const cors = require("cors");
const connectsql = require("../server_connection");

router.post("/signup", (req, res) => {
    var sql = "INSERT INTO user_tables(Name, Password) VALUES(?, ?)"
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