var express = require('express');
var router = express.Router();
var moment = require('moment');
var connection = require('../mysqlConnection'); // 追加
var parts = require('../parts');
const bcrypt = require('bcrypt');
/* GET home page. */
router.get('/', (req, res, next) => {
    res.render('register', {
      pageTitle: `新規会員登録 | ${parts.SiteTitle}`,
      title: '新規会員登録',
    });
});

router.post('/', (req, res, next) => {
  var userName = req.body.user_name;
  var email = req.body.email;
  // var password = req.body.password;
  const hashed_password = bcrypt.hashSync(req.body.password, 10);
  var createdAt = moment().format('YYYY-MM-DD HH:mm:ss');
  var emailExistsQuery = 'SELECT * FROM users WHERE email = "' + email + '" LIMIT 1'; // 追加
  var registerQuery = 'INSERT INTO users (user_name, email, password, created_at) VALUES ("' + userName + '", ' + '"' + email + '", ' + '"' + hashed_password + '", ' + '"' + createdAt + '")'; // 変更
  connection.query(emailExistsQuery, (err, email) => {
    if (email.length){
      res.render("register", {
        SiteTitle: `新規会員登録 | ${SiteTitle}`,
        title: "新規会員登録",
        emailExists: '既に登録されているメールアドレスです'
      }); 
    } else {
      connection.query(registerQuery, (err, rows)=>{
        res.redirect("/login");
      });
    }
  });
});

module.exports = router;