const express = require("express");
const router = express.Router();
const cors = require("cors");
const connectsql = require("../server_connection");

router.get("/profile/:id", function(req, res) {
  const sql = "SELECT * FROM user_tables WHERE ID = ?";
  connectsql.query(sql,[req.params.id], function (err, rows, fields) {
    if(!err) {
      res.status(200).send(rows[0]);
    }
    else {
      console.log(err);
      res.status(500).json("ERROR WITH PROFILE");
    }
  })
})

router.use(cors());

module.exports = router;
