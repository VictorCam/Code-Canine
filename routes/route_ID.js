const express = require("express");
const router = express.Router();
const cors = require("cors");
require("dotenv").config();

const corsOptions = {
    origin: 'http://localhost:8080',
    credentials: true
}

router.use(cors(corsOptions));

const user = require('./middleware/check_user');

router.get("/loadID",user, (req, res) => {
    if(req.user_ID == null) {
        res.status(200).send("0") //they are a guest
    }
    else {
        var id = req.user_ID.toString()
        res.status(200).send(id) //registered user
    }
});


module.exports = router;