var express = require("express");
var router = express.Router();

var db = require("../config/myDb");

/* GET departament listing. */
router.get("/", function (req, res, next) {
    let sql = `
          select * 
          from departament
      `
  
    db.query(sql, (error, result) => {
      if (error) {
        console.error(error);
        throw error;
      }
      if (!result.length) {
        console.log("Table : departament is empty");
      } else {
        res.send(result);
      }
    });
});

/* POST new departament. */
router.post("/", (req, res) => {
  const name_departament = req.body.name_departament;
  const data = [name_departament];
  let sql = "INSERT INTO departament(name_departament) VALUES(?)";
  db.query(sql, [data], (err, result) => {
    if (err) throw err;
    const newId = result.insertId;
    res.setHeader("Content-Type", "application/json");
    res.send({ data: `New departament with id = ${newId} was added to DB` });
  });
});

/* DELETE departament from DB by ID. */
router.delete("/:id", (req, res) => {
  let id = req.params.id;

  let sql = "delete from departament where id_departament=?";

  db.query(sql, [id], (err, result) => {
    if (err) throw err;

    res.setHeader("Content-Type", "application/json");
    res.send({ data: `Departament with id: ${id} was deleted`, deletedId: id });
  });
});

/* UPDATE existing departament by ID. */
router.put("/:id", (req, res) => {
  let id = req.params.id;

  const name_departament = req.body.name_departament;

  const data = [name_departament, id];

  let sql = "UPDATE departament SET name_departament=? where id_departament =?";
  db.query(sql, data, (err, result) => {
    if (err) throw err;
    res.setHeader("Content-Type", "application/json");
    res.send({ data: `Name of departament with ${id} was updated to ${name_departament}` });
  });
});


module.exports = router;