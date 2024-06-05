const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authenticateToken = require('./middleware/auth');
require('dotenv').config();

const CidadesRoutes = require('./Rotas/Cidades');
const ClienteRoutes = require('./Rotas/Clientes');
const cadastroRouter = require('./Rotas/Cadastro');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// conectando ao mongo
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Conectado ao MongoDB'))
    .catch(err => console.log(err));

// importando as rotas
app.use('/Cidades', CidadesRoutes);
app.use('/Clientes', ClienteRoutes);
app.use('/Cadastro', cadastroRouter);

// daqui pra baixo é teste

// Exemplo de rota protegida
app.get('/protected', authenticateToken, (req, res) => {
    res.status(200).send('Esta é uma rota protegida.');
});

// Middleware de tratamento de erros
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Algo deu errado!');
});

module.exports = app;