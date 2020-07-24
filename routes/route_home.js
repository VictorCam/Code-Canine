const express = require("express");
const router = express.Router();
const cors = require("cors");
const connectsql = require("../server_connection");

router.get("/", (req, res) => {
  const sql = "SELECT * FROM user_tables";
  connectsql.query(sql, (err, rows, fields) => {
    if(!err) {
      res.status(200).send(rows);
    }
    else {
      console.log(err);
      res.status(500).json("route error");
    }
  })
});

router.use(cors());

module.exports = router;
