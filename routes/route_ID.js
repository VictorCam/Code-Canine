const express = require("express");
const router = express.Router();
const cors = require("cors");
require("dotenv").config();

const corsOptions = {
    origin: 'http://localhost:8080',
    credentials: true
}

router.use(cors(corsOptions));

const verify = require('./verify_token');

router.get("/loadID",verify, (req, res) => {
    console.log("POST ROUTE ID:", req.user_ID); //yay we can use this for MySQL
    var id = req.user_ID.toString()
    res.status(200).send(id);
});

module.exports = router;