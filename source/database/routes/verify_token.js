const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = function(req,res,next) {
    //res.send(req.cookies.test);
    
    //const token = req.header("Authorization");
    //console.log(token);

    // try {
    //     const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    //     req.user = verified;
    //     // console.log(req.user.username);
    //     next();
    // }
    // catch {
    //     console.log("invalid token");
    //     res.status(400).send("Invalid Token");
    // }
}