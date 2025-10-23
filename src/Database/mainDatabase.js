const mysql = require("mysql2/promise");
require('dotenv').config();

class Database {
  static pool = null;
/*
TODO:
O .env não está funcionando aqui, mas 
adicionando o valor direto funciona.
*/
  static async connect() {
    if (!Database.pool) {
      Database.pool = mysql.createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
      });
      console.log(process.env.DB_USER)
      console.log("[200] MySql pronto!");
    }
    return Database.pool;
  }

  static async query(sql, params = []) {
    try {
      const pool = await Database.connect();
      console.log(pool)
      const [rows] = await pool.execute(sql, params);
      return rows;
    } catch (err) {
      console.error("[500] Falha ao executar query!", err.message);
      console.log(err);
      throw err;
    }
  }
  
  
}

module.exports = Database;