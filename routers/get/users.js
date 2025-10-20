const Database = require('../../Database/mainDatabase');

module.exports = (req, res) => {
  var id = req.query.userId;
  //Algo como Database.query('SELECT * FROM Users WHERE id = ?', [id]);
};