const mysql = require("mysql2/promise");

class Database {
  static pool = null;

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
      console.log("[200] MySql pronto!");
    }
    return Database.pool;
  }

  static async query(sql, params = []) {
    try {
      const pool = await Database.connect();
      const [rows] = await pool.execute(sql, params);
      return rows;
    } catch (err) {
      console.error("[500] Falha ao executar query!", err.message);
      throw err;
    }
  }
}

module.exports = new Database();