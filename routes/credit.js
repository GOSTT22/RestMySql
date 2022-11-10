var express = require("express");
var router = express.Router();

var db = require("../config/myDb");

/* GET credit listing. */
router.get("/", function (req, res, next) {
    let sql = `
          select * 
          from credit
      `
  
    db.query(sql, (error, result) => {
      if (error) {
        console.error(error);
        throw error;
      }
      if (!result.length) {
        console.log("Table : credit is empty");
      } else {
        res.send(result);
      }
    });
});

/* POST new credit. */
router.post("/", (req, res) => {

    const id_client = req.body.id_client;
    const typeOfCredit = req.body.typeOfCredit;
    const sumOfCredit = req.body.sumOfCredit;
    const percent = req.body.percent;
    const typeOfCurrency = req.body.typeOfCurrency;
    const dateOfIssue = req.body.dateOfIssue;
    const dateOfReturn = req.body.dateOfReturn;

    const data = [ id_client, typeOfCredit, sumOfCredit, percent, typeOfCurrency, dateOfIssue, dateOfReturn];
let sql = "INSERT INTO credit(id_client, typeOfCredit, sumOfCredit, percent, typeOfCurrency, dateOfIssue, dateOfReturn) VALUES(?)";
  db.query(sql, [data], (err, result) => {
    if (err) throw err;
    const newId = result.insertId;
    res.setHeader("Content-Type", "application/json");
    res.send({ data: `New credit with id = ${newId} was added to DB` });
  });
});

/* DELETE credit from DB by ID. */
router.delete("/:id", (req, res) => {
  let id = req.params.id;

  let sql = "delete from credit where id_credit=?";

  db.query(sql, [id], (err, result) => {
    if (err) throw err;

    res.setHeader("Content-Type", "application/json");
    res.send({ data: `Credit with id: ${id} was deleted`, deletedId: id });
  });
});

/* UPDATE existing credit by ID. */
router.put("/:id", (req, res) => {
  let id = req.params.id;

    const id_client = req.body.id_client;
    const typeOfCredit = req.body.typeOfCredit;
    const sumOfCredit = req.body.sumOfCredit;
    const percent = req.body.percent;
    const typeOfCurrency = req.body.typeOfCurrency;
    const dateOfIssue = req.body.dateOfIssue;
    const dateOfReturn = req.body.dateOfReturn;
    const data = [id_client, typeOfCredit, sumOfCredit, percent, typeOfCurrency, dateOfIssue, dateOfReturn, id];

    let sql = "UPDATE credit SET id_client=?, typeOfCredit=?, sumOfCredit=?, percent=?, typeOfCurrency=?, dateOfIssue=?, dateOfReturn=? where id_credit =?";
   db.query(sql, data, (err, result) => {
    if (err) throw err;
    // res.setHeader("Content-Type", "application/json");

    const d={
      id_credit: id, id_client, typeOfCredit, sumOfCredit, percent, typeOfCurrency, dateOfIssue, dateOfReturn
    }

    res.send(d);

  });
});


module.exports = router;