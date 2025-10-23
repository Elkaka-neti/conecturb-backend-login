const Database = require('../../src/Database/mainDatabase');
module.exports = async(req, res) => {
  const {ownerid, name, telefone, location, delivery} = req.body.data;
  
  if(!ownerid) return res.status(400).json({message: 'O id do dono e obrigatorio'});
  try {
  const result = await Database.query('INSERT INTO Stores (ownerId, name, telefone, location, delivery) VALUES (?,?,?,?,?)', [ownerid, name, telefone,location,delivery]);
  
  
  res.status(201).json({message: '[201] Loja criada com sucesso!', storeId: result.insertId});
  
  }catch(e) {
    res.status(500).json({message: '[500] Erro interno ao criar loja.'})
  }
  
}