// aqui serao colocadas as rotas relacionadas ao objeto/tabela cliente

const express = require('express');
const router = express.Router();
const Cliente = require('../models/Cliente');
const Cidade = require('../models/Cidade');

// rota para um novo cliente
router.post('/', async (req, res) => {
    const { nomeCompleto, sexo, dataNascimento, idade, cidadeId } = req.body;
    try {
        const Cidade = await Cidade.findById(cidadeId);
        if (!Cidade) {
            return res.status(404).json({ error: 'Cidade não encontrada' });
        }

        const newCliente = new Cliente({
            nomeCompleto,
            sexo,
            dataNascimento,
            idade,
            cidade: cidadeId
        });
        await newCliente.save();
        res.status(201).json(newCliente);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar cliente' });
    }
});

// rota para pegar todos os clientes
router.get('/', async (req, res) => {
    try {
        const Clientes = await Cliente.find().populate('cidade').select('-_id -__v');
        res.status(200).json(Clientes);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar clientes' });
    }
});

module.exports = router;