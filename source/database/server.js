const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//imported routes
const
  home = require('../routes/route_home'),
  profiles = require('../routes/route_profile'),
  register = require('../routes/route_register'),
  login = require('../routes/route_login'),
  post = require('../routes/route_post')

//linked routes (route middleware)
app.use("/", [home,profiles,register,login,post]);


//port
const PORT = process.env.PORT || 13377;
app.listen(PORT, function() {
  console.log("Server is running on port:", PORT);
});