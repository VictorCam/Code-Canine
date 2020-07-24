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

router.get("/logout",verify, (req, res) => {
    res.clearCookie("vuex");
    res.clearCookie("token");
    res.status(200).send(false); //properly logged out (I think I might need to reset data after this in my store?)
});

module.exports = router;