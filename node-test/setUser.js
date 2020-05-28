var connection = require('./mysqlConnection');
module.exports = (req, res, next) => {

  var userId = req.session.user_id;
  if (userId) {
    var query = 'SELECT user_id, user_name FROM users WHERE user_id = ' + userId;
    connection.query(query, (err, rows) => {
      res.locals.user = rows[0];
    });
  }
  next();
};