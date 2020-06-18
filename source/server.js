const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//routes
const
  home = require('./routes/route_home'),
  profiles = require('./routes/route_profile'),
  register = require('./routes/route_register')

//linked routes
app.use("/", [home,profiles,register]);


//port
const PORT = process.env.PORT || 13377;
app.listen(PORT, function() {
  console.log("Server is running on port:", PORT);
});