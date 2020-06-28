const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = function(req,res,next) {
    fetch('http://localhost:13377/login', {
        method: 'post', headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    })
    .then(res => res.json())
    .then(json => console.log(json))
    };
