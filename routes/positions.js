const { request } = require("express");
var express = require("express");
var router = express.Router();

var db = require("../config/myDb");

/* GET positions listing. */
router.get("/", function (req, res, next) {
  // console.log(req.query);
  const value = req.query.bid;

    let sql = value?`
          select * 
          from positions
          where bid >${value}
      ` : `select * 
            from positions`;
  
    db.query(sql, (error, result) => {
      if (error) {
        console.error(error);
        throw error;
      }
      if (!result.length) {
        console.log("Table : positions is empty");
      } else {
        res.send(result);
      }
    });
});

/* POST new positions. */
router.post("/", (req, res) => {
  const positions = req.body.positions;
  const bid = req.body.bid;
  const data = [positions, bid];
  let sql = "INSERT INTO positions(positions, bid) VALUES(?)";
  db.query(sql, [data], (err, result) => {
    if (err) throw err;
    const newId = result.insertId;
    // console.log(result);
    res.setHeader("Content-Type", "application/json");
    res.send({ data: `New positions with id = ${newId} was added to DB` });
  });
});

/* DELETE positions from DB by ID. */
router.delete("/:id", (req, res) => {
  let id = req.params.id;

  let sql = "delete from positions where id_positions=?";

  db.query(sql, [id], (err, result) => {
    if (err) throw err;

    res.setHeader("Content-Type", "application/json");
    res.send({ data: `Positions with id: ${id} was deleted`, deletedId: id });
  });
});

/* UPDATE existing positions by ID. */
router.put("/:id", (req, res) => {
  let id = req.params.id;

  const positions = req.body.positions;
  const bid = req.body.bid;

  const data = [positions, bid, id];

  let sql = "UPDATE positions SET positions=?, bid=? where id_positions =?";
  db.query(sql, data, (err, result) => {
    if (err) throw err;
    res.setHeader("Content-Type", "application/json");
    res.send({ data: `Name of positions with ${id} was updated to ${positions}, and BID was updated to ${bid}.` });
  });
});

/* GET positions listing. */
router.get("/bid/:value", function (req, res, next) {

  const value = req.params.value;
  
  let sql = `
        select positions 
        from positions
        where bid >?
    `

db.query(sql, [value], (error, result) => {
    if (error) {
      console.error(error);
      throw error;
    }
    if (!result.length) {
      console.log("Request : bid is empty.");
    } else {
      res.send(result);
    }
  });
});

/* GET positions listing. */
router.get("/value", function (req, res, next) {
  const bid = req.query.bid;
  const positions = req.query.positions;

  const data = [positions, bid];

    let sql = `INSERT INTO positions(positions, bid) VALUES(?)`;
  
    db.query(sql, [data], (error, result) => {
      if (error) {
        console.error(error);
        throw error;
      }
      else {
        res.send(result);
      }
    });
});

/* POST new positions. */
router.post("/get", (req, res) => {

  const positions = req.body.positions;
  const bid = +req.body.bid;

  const data = [positions, bid];
  
  let sql = `
        select positions 
        from positions
        where positions=? and bid >?
    `;

  db.query(sql, data, (error, result) => {
    if (error) {
      console.error(error);
      throw error;
    }
    if (!result.length) {
      console.log("Request : bid is empty.");
    } else {
      res.send(result);
    }
  });
});

module.exports = router;