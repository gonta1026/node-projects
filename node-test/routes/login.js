var express = require('express');
var router = express.Router();
var connection = require('../mysqlConnection');
var parts = require("../parts");
const bcrypt = require('bcrypt');

router.get("/", (req, res, next) => {
  if (req.session.user_id) {
    res.redirect('/');
  } else {
    res.render('login', {
      pageTitle: `ログイン | ${parts.SiteTitle}`
    });
  }
});


router.post("/", function(req, res, next){
  var email = req.body.email;
  var password = req.body.password;
  var hashPasswordQuery = `SELECT password FROM users WHERE email = "${email}" LIMIT 1`
  connection.query(hashPasswordQuery, (err, hashPassword) => {
    var query = `SELECT user_id FROM users WHERE email = "${email}" AND password = "${hashPassword[0].password}" LIMIT 1`
    connection.query(query, (err, rows) => {
      var userId = rows.length && bcrypt.compareSync(password, hashPassword[0].password) ? rows[0].user_id : false;
      if (userId){
        req.session.user_id = userId;
        res.redirect("/");
      } else {
        res.render("login", {
          pageTitle: "ログイン",
          noUser: 'メールアドレスとパスワードをもう一度確認してください！'
        });
      }
    });
  });
});

module.exports = router;