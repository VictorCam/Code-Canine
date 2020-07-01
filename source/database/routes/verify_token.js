const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = function(req,res,next) {
    var allcookies = req.headers.cookie;
    console.log(allcookies);
    var pcookie = allcookies.split(";");
    var ptoken = pcookie[0].split("=");

    if(!ptoken[1]) {
        return res.status(401).send("Access Denied");
    }

    jwt.verify(ptoken[1],process.env.TOKEN_SECRET, (err,user) => {
    if(!err) {
        req.user_ID = user.user_ID; //data to post
        return next();
      }
    else {
        return res.status(400).send("Invalid Token");
    }
  })
};
