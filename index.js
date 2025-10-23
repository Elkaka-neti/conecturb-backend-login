const express = require('express');
const path = require('path');
const registerRoutes = require('./utils/registerRouters');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
        res.send("hello");
    });  

const routerDir = path.join(__dirname, 'routers');
    registerRoutes(app, routerDir);

app.listen(3000, '127.0.0.1', () => {
  console.log('Servidor rodando na porta 3000');
});

module.exports = app;