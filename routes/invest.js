var express = require("express");
var router = express.Router();

var db = require("../config/myDb");

/* GET invest listing. */
router.get("/", function (req, res, next) {
    let sql = `
          select * 
          from invest
      `
  
    db.query(sql, (error, result) => {
      if (error) {
        console.error(error);
        throw error;
      }
      if (!result.length) {
        console.log("Table : invest is empty");
      } else {
        res.send(result);
      }
    });
});

/* POST new invest. */
router.post("/", (req, res) => {

  const id_client = req.body.id_client;
  const numberCheck = req.body.numberCheck;
  const typeOfCheck = req.body.typeOfCheck;
  const typeOfInvest = req.body.typeOfInvest;
  const sumOfInvest = req.body.sumOfInvest;
  const dateOfTheBegining = req.body.dateOfTheBegining;
  const dateOfCompletion = req.body.dateOfCompletion;

  const data = [ id_client, numberCheck, typeOfCheck, typeOfInvest, sumOfInvest, dateOfTheBegining, dateOfCompletion];
  let sql = "INSERT INTO invest(id_client, numberCheck, typeOfCheck, typeOfInvest, sumOfInvest, dateOfTheBegining, dateOfCompletion) VALUES(?)";
  db.query(sql, [data], (err, result) => {
    if (err) throw err;
    const newId = result.insertId;
    res.setHeader("Content-Type", "application/json");
    res.send({ data: `New invest with id = ${newId} was added to DB` });
  });
});

/* DELETE invest from DB by ID. */
router.delete("/:id", (req, res) => {
  let id = req.params.id;

  let sql = "delete from invest where id_invest=?";

  db.query(sql, [id], (err, result) => {
    if (err) throw err;

    res.setHeader("Content-Type", "application/json");
    res.send({ data: `Invest with id: ${id} was deleted`, deletedId: id });
  });
});

/* UPDATE existing invest by ID. */
router.put("/:id", (req, res) => {
  let id = req.params.id;

  const id_client = req.body.id_client;
  const numberCheck = req.body.numberCheck;
  const typeOfCheck = req.body.typeOfCheck;
  const typeOfInvest = req.body.typeOfInvest;
  const sumOfInvest = req.body.sumOfInvest;
  const dateOfTheBegining = req.body.dateOfTheBegining;
  const dateOfCompletion = req.body.dateOfCompletion;

  const data = [id_client, numberCheck, typeOfCheck, typeOfInvest, sumOfInvest, dateOfTheBegining, dateOfCompletion, id];

  let sql = "UPDATE invest SET  id_client=?, numberCheck=?, typeOfCheck=?, typeOfInvest=?, sumOfInvest=?, dateOfTheBegining=?, dateOfCompletion=? where id_invest =?";
  db.query(sql, data, (err, result) => {
    if (err) throw err;
    res.setHeader("Content-Type", "application/json");

    const d={
      id_client, numberCheck, typeOfCheck, typeOfInvest, sumOfInvest, dateOfTheBegining, dateOfCompletion, id
    }
    res.send(d);
  });
});

module.exports = router;