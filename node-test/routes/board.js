var express = require('express');
var router = express.Router();
var moment = require('moment'); // 追加
var multer = require('multer'); // 追加
var connection = require('../mysqlConnection'); // 追加
var parts = require("../parts");
var upload = multer({ dest: './public/images/uploads/' }); // 追加
var cloudinary = require('cloudinary');
cloudinary.config({
  cloud_name: "dkjpaqmdg",
  api_key: "491981248625334",
  api_secret: "KujLG1AfUDjClpiJ1q_dmqhp5Yk"
});

/* GET home page. */
router.get('/:board_id', (req, res, next) => {
  var boardId = req.params.board_id;
  console.log(req.params);
  var getBoardQuery = 'SELECT * FROM boards WHERE board_id = ' + boardId;
  var getMessagesQuery = 'SELECT M.message, M.image_path, ifnull(U.user_name, \'名無し\') AS user_name, DATE_FORMAT(M.created_at, \'%Y年%m月%d日 %k時%i分%s秒\') AS created_at FROM messages M LEFT OUTER JOIN users U ON M.user_id = U.user_id WHERE M.board_id = ' + boardId + ' ORDER BY M.created_at ASC'; // 変更
  connection.query(getBoardQuery, function(err, board) {
    connection.query(getMessagesQuery, (err, messages) => {
      res.render('board', {
        pageTitle: `${board[0].title}の詳細ページ | ${parts.SiteTitle}`,
        title: board[0].title,
        board: board[0],
        messages
      });
    });
  });
});

router.post('/:board_id', upload.single('image_file'), function(req, res) {
  var message = req.body.message;
  var boardId = req.params.board_id;
  var userId = req.session.user_id ? req.session.user_id : 0;
  var createdAt = moment().format("YYYY-MM-DD HH:mm:ss");  
  if (req.file === undefined) {
    var imagePath = "";
    var query = 'INSERT INTO messages (image_path, message, board_id, user_id, created_at) VALUES ("' + imagePath + '", ' + '"' + message + '", ' + '"' + boardId + '", ' + '"' + userId + '", ' + '"' + createdAt + '")';
    connection.query(query, function(err, rows) {
      res.redirect('/boards/' + boardId);
    });
  } else {
    var path = req.file.path;
    cloudinary.uploader.upload(path, function(result) {
      var imagePath = result.url;
      var query = 'INSERT INTO messages (image_path, message, board_id, user_id, created_at) VALUES ("' + imagePath + '", ' + '"' + message + '", ' + '"' + boardId + '", ' + '"' + userId + '", ' + '"' + createdAt + '")';
      connection.query(query, function(err, rows) {
        res.redirect('/boards/' + boardId);
      });
    });
  }
});

module.exports = router;