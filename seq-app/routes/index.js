var express = require('express');
var router = express.Router();
let Modle = require('../models/index');
const axios = require('axios');
/* GET home page. */
router.get('/', (req, res, next) => {
  Modle.diaries.findAll({
    order: [
            ['id', 'DESC'],
    ],
    where: {
    }
  }).then((diaries) => { // usersのところが自分で作成したモデル
    res.render("index", {
      title: "タイトル",
      diaries
    });
  })
  .catch((err)=>{
    res.status(500).send(err);
  });
});

router.post('/', (req, res, next) => {
  Modle.diaries.create({
    diary_title: req.body.diary_title,
    diary_body: req.body.diary_body,
    user_id: 1,
  }).then(() => {
    res.redirect("/"); // ajaxのdoneにdataを渡す
  }).catch((err) => {
    res.status(500).send(err);
  });
});

router.post("/destroy", (req, res, next) =>{
  Modle.diaries.destroy({
    where: {
      id: req.body.id
    }
  }).then(()=>{
    res.redirect("/");
  });
});

router.post('/edit/:id', function (req, res, next) {
  Modle.diaries.update({
    diary_title: req.body.first_name,
    diary_body: req.body.last_name,
  }, {
    where: {
      id: req.params.id
    }
  }).then(function () {
    res.redirect('/');
  });
});

module.exports = router;
