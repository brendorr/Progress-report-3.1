const express = require('express');
const router = express.Router();
const Cliente = require('../models/Cliente');
const Cidade = require('../models/Cidade');

// Criar um novo cliente
router.post('/', async (req, res) => {
    const { nomeCompleto, sexo, dataNascimento, idade, cidadeNome } = req.body; // Alteração aqui para cidadeNome
    try {
        const cidade = await Cidade.findOne({ nome: cidadeNome }); // Buscar cidade pelo nome
        if (!cidade) {
            return res.status(404).json({ error: 'Cidade não encontrada' });
        }

        const newCliente = new Cliente({
            nomeCompleto,
            sexo,
            dataNascimento,
            idade,
            cidade: cidade._id // Usar o ID da cidade encontrada
        });
        await newCliente.save();
        res.status(201).json(newCliente);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar cliente' });
    }
});

// Obter todos os clientes
router.get('/', async (req, res) => {
    try {
        const clientes = await Cliente.find().populate('cidade').select('-__v');
        res.status(200).json(clientes);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar clientes' });
    }
});

// Consultar cliente pelo nome
router.get('/nome/:nome', async (req, res) => {
    try {
        const clientes = await Cliente.find({ nomeCompleto: req.params.nome }).populate('cidade').select('-__v');
        res.status(200).json(clientes);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar cliente pelo nome' });
    }
});

// Consultar cliente pelo ID
router.get('/:id', async (req, res) => {
    try {
        const cliente = await Cliente.findById(req.params.id).populate('cidade').select('-__v');
        if (cliente) {
            res.status(200).json(cliente);
        } else {
            res.status(404).json({ error: 'Cliente não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar cliente pelo ID' });
    }
});

// Remover cliente
router.delete('/:id', async (req, res) => {
    try {
        const result = await Cliente.findByIdAndDelete(req.params.id);
        if (result) {
            res.status(200).json({ message: 'Cliente removido com sucesso' });
        } else {
            res.status(404).json({ error: 'Cliente não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Erro ao remover cliente' });
    }
});

// Alterar o nome do cliente
router.put('/:id', async (req, res) => {
    const { nomeCompleto } = req.body;
    try {
        const cliente = await Cliente.findById(req.params.id);
        if (cliente) {
            if (nomeCompleto) cliente.nomeCompleto = nomeCompleto;
            await cliente.save();
            res.status(200).json(cliente);
        } else {
            res.status(404).json({ error: 'Cliente não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar cliente' });
    }
});

module.exports = router;
