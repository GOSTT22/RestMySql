var express = require("express");
var router = express.Router();

var db = require("../config/myDb");

/* GET workers listing. */
router.get("/", function (req, res, next) {
    let sql = `
          select * 
          from workers
      `
  
    db.query(sql, (error, result) => {
      if (error) {
        console.error(error);
        throw error;
      }
      if (!result.length) {
        console.log("Table : workers is empty");
      } else {
        res.send(result);
      }
    });
});

/* POST new workers. */
router.post("/", (req, res) => {
  const fio = req.body.fio;
  const phone = req.body.phone;
  const birthday = req.body.birthday;
  const id_departament = req.body.id_departament;
  const id_positions = req.body.id_positions;

  const data = [fio, phone, birthday, id_departament, id_positions];
  let sql = "INSERT INTO workers(fio, phone, birthday, id_departament, id_positions) VALUES(?)";
  db.query(sql, [data], (err, result) => {
    if (err) throw err;
    const newId = result.insertId;
    res.setHeader("Content-Type", "application/json");
    res.send({ data: `New workers with id = ${newId} was added to DB` });
  });
});

/* DELETE workers from DB by ID. */
router.delete("/:id", (req, res) => {
  let id = req.params.id;

  let sql = "delete from workers where id_workers=?";

  db.query(sql, [id], (err, result) => {
    if (err) throw err;

    res.setHeader("Content-Type", "application/json");
    res.send({ data: `Worker with id: ${id} was deleted`, deletedId: id });
  });
});

/* UPDATE existing workers by ID. */
router.put("/:id", (req, res) => {
  let id = req.params.id;

  const fio = req.body.fio;
  const phone = req.body.phone;
  const birthday = req.body.birthday;
  const id_departament = req.body.id_departament;
  const id_positions = req.body.id_positions;

  const data = [fio, phone, birthday, id_departament, id_positions, id];

  let sql = "UPDATE workers SET fio=?, phone=?, birthday=?, id_departament=?, id_positions=? where id_workers =?";
  db.query(sql, data, (err, result) => {
    if (err) throw err;
    res.setHeader("Content-Type", "application/json");
    res.send({ data: `Name of workers with ${id} was updated to ${fio}` });
  });
});

module.exports = router;