// aqui serao colocadas todas as rotas que envolvam cidades

const express = require('express');
const router = express.Router();
const Cidade = require('../models/Cidade');

// usando o router para nao ter que jogar todas as rotas em 1 mesmo arquivo

// rota para criar cidade
router.post('/', async (req, res) => {
    const { nome, estado } = req.body;
    try {
        const newCidade = new Cidade({ nome, estado });
        await newCidade.save();
        res.status(201).json(newCidade);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar cidade' });
    }
});

// rota para pegar as cidades
router.get('/', async (req, res) => {
    try {
        const cities = await Cidade.find().select('-_id -__v'); // o mongodb por padrao cria um id e esse __v que parece servir para controle de versao, achei que nao faria sentido retornar eles.
        res.status(200).json(cities);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar cidades' });
    }
});

module.exports = router;