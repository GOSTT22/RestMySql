const { request } = require("express");
var express = require("express");
var router = express.Router();

var db = require("../config/myDb");

/* GET clients listing. */
router.get("/", function (req, res, next) {
  // console.log(req.query);

    let sql = `select * from clients`;
  
    db.query(sql, (error, result) => {
      if (error) {
        console.error(error);
        throw error;
      }
      if (!result.length) {
        console.log("Table : clients is empty");
      } else {
        res.send(result);
      }
    });
});

/* POST new clients. */
router.post("/", (req, res) => {
    const id_client = req.body.id_client;
    const fio = req.body.fio;
    const passportNomer = req.body.passportNomer;
    const citizenship = req.body.citizenship;
    const country = req.body.country;
    const city = req.body.city;
    const streetHouseFlat = req.body.streetHouseFlat;

  const data = [id_client, fio, passportNomer, citizenship, country, city, streetHouseFlat];
  let sql = "INSERT INTO clients(id_client, fio, passportNomer, citizenship, country, city, streetHouseFlat) VALUES(?)";
 db.query(sql, [data], (err, result) => {
    if (err) throw err;
    const newId = result.insertId;
    // console.log(result);
    res.setHeader("Content-Type", "application/json");
    res.send({ data: `New clients with id = ${newId} was added to DB` });
  });
});

/* DELETE clients from DB by ID. */
router.delete("/:id", (req, res) => {
  let id = req.params.id;

  let sql = "delete from clients where id_client=?";

  db.query(sql, [id], (err, result) => {
    if (err) throw err;

    res.setHeader("Content-Type", "application/json");
    res.send({ data: `Clients with id: ${id} was deleted`, deletedId: id });
  });
});

/* UPDATE existing clients by ID. */
router.put("/:id", (req, res) => {
  let id = req.params.id;

  const fio = req.body.fio;
  const passportNomer = req.body.passportNomer;
  const citizenship = req.body.citizenship;
  const country = req.body.country;
  const city = req.body.city;
  const streetHouseFlat = req.body.streetHouseFlat;

  const data = [fio, passportNomer, citizenship, country, city, streetHouseFlat, id];
 
  let sql = "UPDATE clients SET fio=?, passportNomer=?, citizenship=?, country=?, city=?, streetHouseFlat=?  where id_client =?";
  db.query(sql, data, (err, result) => {
    if (err) throw err;
    res.setHeader("Content-Type", "application/json");

    const d={
      fio, passportNomer, citizenship, country, city, streetHouseFlat, id
    }
    res.send(d);
  });
});

module.exports = router;