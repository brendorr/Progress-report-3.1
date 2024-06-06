const express = require('express');
const router = express.Router();
const Cidade = require('../models/Cidade');
const authenticateToken = require('../middleware/auth');

// criando nova cidade
router.post('/', authenticateToken, async (req, res) => {
    const { nome, estado } = req.body;
    if (!nome || !estado) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
    }
    try {
        const newCidade = new Cidade({ nome, estado });
        await newCidade.save();
        const cidadeResponse = newCidade.toObject(); // simplesmente para nao aparecer o __V na resposta
        delete cidadeResponse.__v;
        res.status(201).json(cidadeResponse);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao criar cidade' });
    }
});

// Obtendo todas as cidades
router.get('/',authenticateToken, async (req, res) => {
    try {
        const cidades = await Cidade.find().select('-__v');
        if (clientes.length === 0){
            return res.status(404).json({ error: 'Não existe nenhuma cidade cadastrada no banco de dados' });
        }
        res.status(200).json(cidades);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar cidades' });
    }
});

// consultar cidade pelo nome
router.get('/nome/:nome',authenticateToken, async (req, res) => {
    try {
        const cidades = await Cidade.find({ nome: req.params.nome }).select('-__v');
        if (cidades.length === 0){
            return res.status(404).json({ error: 'Nenhuma cidade com esse nome foi encontrada' });
         }
        res.status(200).json(cidades);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar cidade pelo nome' });
    }
});

// consultar cidade pelo estado
router.get('/estado/:estado',authenticateToken, async (req, res) => {
    try {
        const cidades = await Cidade.find({ estado: req.params.estado }).select('-__v');
        if (cidades.length === 0){
            return res.status(404).json({ error: 'O estado em questão não existe em nosso banco de dados' });
         }
        res.status(200).json(cidades);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar cidade pelo estado' });
    }
});

module.exports = router;
