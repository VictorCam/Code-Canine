const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var routes = require("./routes");

app.use("/", routes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, function() {
  console.log("Server is running on port:", PORT);
});
