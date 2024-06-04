const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();

const CidadesRoutes = require('./Rotas/Cidades');
const ClienteRoutes = require('./Rotas/Clientes');

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

module.exports = app;