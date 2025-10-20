const Database = require('../../Database/mainDatabase');
const hash = require('algum sistema de hash para nodejs')
module.exports = (req, res) => {
  //temos que tratar o password no futuro para hash
  const {id, name, email, password, telefone, role} = req.body.data;
  
  
}