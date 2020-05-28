var express = require('express');
var router = express.Router();
const db = require("../models/index");

// Read
router.get("/", async (req, res, next) => {
  try {
    const result = await db.task.findAll({
      order: [
        ['id', 'DESC'],
      ],
    });
    res.send({
      "task": result
    });
  } catch (err) {
    res.status(500).send(err);
  }
});

//Create
router.post("/task", async (req, res, next) => {
  try {
    const result = await db.task.create({
      taskname: req.body.task
    });
    res.send(result);
  } catch (err) {
    res.status(500).send(err);
  }
});

//Update
router.put("/task/:id", async (req, res, next) => {
  try {
    const result = await db.task.update(
      {
        taskname: req.body.task
      },
      {
        where: {
          id: req.params.id
        }
      }
    );
    res.send(result);
  } catch (err) {
    res.status(500).send(err);
  }
});

//Delete
router.delete("/task/:id", async (req, res, next) => {
  try {
    const result = await db.task.destroy({
      where: {
        id: req.params.id
      }
    });
    res.send({
      result: result
    });
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
