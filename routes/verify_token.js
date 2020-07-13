const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = function(req,res,next) {

    if(req.headers.cookie == null) { //check if cookie exist
      return
    }

    var store = getCookieValue('vuex', req); //do regex match since cookie exists
    if(!store) {
      res.status(200)
    }

    var key = getCookieValue('token', req); //do regex match since cookie exists
    if(!key) {
        res.clearCookie('vuex');
        return res.status(401).send("Access Denied"); //if cookie name does not match then error out
    }

    jwt.verify(key,process.env.TOKEN_SECRET, (err,user) => {
    if(!err) {
        req.user_ID = user.user_ID; //sending data to route
        return next();
      }
    else {
        res.clearCookie('vuex'); //NOTE to self: alternate solution would be to edit the cookies state
        return res.status(400).send("Invalid Token"); //error if jwt is expired or invalid
    }
  })
};

function getCookieValue(a,req) {
  var b = req.headers.cookie.match('(^|;)\\s*' + a + '\\s*=\\s*([^;]+)');
  return b ? b.pop() : '';
}