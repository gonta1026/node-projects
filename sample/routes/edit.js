var express = require('express');
var router = express.Router();
var models = require("../models");

router.get('/:id', function (req, res, next) {
  models.Human.findAll({
      where: {
        id: req.params.id
      }
    }).then(human => {
      res.render("edit", {
        human: human[0]
      });
    })
  });

/* GET home page. */

module.exports = router;