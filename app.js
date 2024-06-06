const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./models/database');
require('dotenv').config();

const CidadesRoutes = require('./Rotas/Cidades');
const ClienteRoutes = require('./Rotas/Clientes');
const cadastroRouter = require('./Rotas/Cadastro');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// conectando ao banco
connectDB();

// importando as rotas
app.use('/Cidades', CidadesRoutes);
app.use('/Clientes', ClienteRoutes);
app.use('/Cadastro', cadastroRouter);




module.exports = app;