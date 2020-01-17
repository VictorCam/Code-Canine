const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var users = require("./routes/users");

app.use("/", users);
app.use("/profile/:id", users);

const PORT = process.env.PORT || 11889;
app.listen(PORT, function() {
  console.log("Server is running on port:", PORT);
});
