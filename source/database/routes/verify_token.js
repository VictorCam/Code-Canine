const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = function(req,res,next) {
    var key = getCookieValue('token', req);
    if(!key) {
        return res.status(401).send("Access Denied");
    }

    jwt.verify(key,process.env.TOKEN_SECRET, (err,user) => {
    if(!err) {
        req.user_ID = user.user_ID; //data to post
        return next();
      }
    else {
        return res.status(400).send("Invalid Token");
    }
  })
};

function getCookieValue(a,req) {
  var b = req.headers.cookie.match('(^|;)\\s*' + a + '\\s*=\\s*([^;]+)');
  return b ? b.pop() : '';
}