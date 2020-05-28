// const mysql = require('mysql2');
const createError = require('http-errors');
const express = require('express');
const engine = require('ejs-locals'); // 追加
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require("express-session");
const logger = require('morgan');
const app = express();
// view engine setup
console.log()
app.engine('ejs', engine); // 追加
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));//静的ファイル置き場
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));

app.use('/', require("./setUser"), require('./routes/index')); //ボードトップページ
app.use('/users', require('./routes/users')); //ユーザー勉強
app.use('/boards', require("./setUser"), require('./routes/board')); //ボード詳細ページ
app.use('/register', require('./routes/register')); //新規ユーザー登録ページ
app.use('/login', require("./routes/login")); // ユーザー登録ページ
app.use('/logout', require("./routes/logout")); // ログアウト
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
