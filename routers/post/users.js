const Database = require('../../Database/mainDatabase');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = async function createUser(req, res) {
  try {
    const { name, email, telefone, role, password } = req.body.data;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Dados invalidos' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);


    const result = await Database.query(
      'INSERT INTO Users (name, email, password, telefone, role) VALUES (?, ?, ?, ?, ?)',
      [name, email, hashedPassword, telefone || null, role || 'client']
    );

    
    const userId = result.insertId;

  
    const token = jwt.sign(
      { id: userId },
      process.env.JWT_SECRET,
      { expiresIn: '25m' }
    );

    const refreshToken = jwt.sign(
      { id: userId },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    return res.status(201).json({
      message: 'Usuário criado com sucesso!',
      token,
      refreshToken,
      userId
    });

  } catch (err) {
    console.error('[500] Erro ao criar usuário:', err.message);
    return res.status(500).json({ message: 'Erro interno ao criar usuário.' });
  }
};