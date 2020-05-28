var express = require('express');
var router = express.Router();
var models = require("../models");
/* GET home page. */

router.get('/', function (req, res, next) {
  models.Human.findAll({
    include: [models.Pet]
  }).then(humans => {
    res.render("index", {
      humans: humans
    });
  });
});

router.post('/human/add', (req, res, next) => {
  models.Human.create({
    name: req.body.name,
    age: req.body.age
  }).then(newUser => {
    res.redirect("/");
  });
});

router.post('/human/destroy', (req, res, next) => {
  models.Human.destroy({
    where: {
      id: req.body.id
    }
  }).then(deletedUser => {
    res.redirect("/");
  })
});

router.post('/pet/add', (req, res, next) => {
  models.Pet.create({
    name: req.body.name,
    kind: req.body.kind,
    HumanId: req.body.HumanId
  }).then(() => {
    res.redirect("/");
  })
});

module.exports = router;
