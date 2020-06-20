const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = function(req,res,next) {
    const token = req.header("auth-token");
    if(!token) {
        return res.status(401).send("Access Denied");
    }

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        jwt.verify
        req.user = verified;
        console.log(req.user.username);
        next();
    }  
    catch {
        res.status(400).send("Invalid Token");
    }
}