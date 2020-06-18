const express = require("express");
const router = express.Router();
const cors = require("cors");
const connectsql = require("../db_connection");


router.get("/profile/:id", function(req, res) {
  const id = req.params.id;
  connectsql.query('SELECT * FROM user_tables WHERE ID = ' + connectsql.escape(id) , (err, rows, fields) => {
    if(!err) {
      res.status(200).send(rows[0]);
    }
    else {
      console.log(err);
      res.status(500).json("ERROR");
    }
  });
})

router.use(cors());

module.exports = router;
