const express = require("express");
const connectsql = require("../db_connection");
const jwt = require("jsonwebtoken");
const bodyParser = require('body-parser');
const cookie = require('cookie');
require("dotenv").config();


var app = express();

const router = express.Router();


module.exports = function (req, res, next) {
    res.setHeader('Set-Cookie', cookie.serialize('name', "secretcookie", {
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 7 // 1 week
      }));
    next();
};