const express = require('express');
const router = express.Router();
const Cliente = require('../models/Cliente');
const Cidade = require('../models/Cidade');
const authenticateToken = require('../middleware/auth');

// Criar um novo cliente
router.post('/', authenticateToken, async (req, res) => {
    const { nomeCompleto, sexo, dataNascimento, idade, cidadeNome } = req.body;

    // Verificando se o cara nao esqueceu de mandar nada
    if (!nomeCompleto || !sexo || !dataNascimento || !idade || !cidadeNome) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
    }

    try {
        const cidade = await Cidade.findOne({ nome: cidadeNome }); // Verificar se a cidade que ele forneceu existe no banco de dados
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
        const ClienteResponse = newCliente.toObject(); // simplesmente para nao aparecer o __V na resposta
        delete ClienteResponse.__v;
        await newCliente.save();
        res.status(201).json(ClienteResponse);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao criar cliente' });
    }
});

// Obter todos os clientes
router.get('/', authenticateToken,async (req, res) => {
    try {
        const clientes = await Cliente.find().populate('cidade').select('-__v');
        if (clientes.length === 0){
            return res.status(404).json({ error: 'Não existe nenhum cliente cadastrado no banco de dados' });
        }
        res.status(200).json(clientes);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar clientes' });
    }
});

// Consultar cliente pelo nome
router.get('/nome/:nome',authenticateToken, async (req, res) => {
    try {
        const clientes = await Cliente.find({ nomeCompleto: req.params.nome }).populate('cidade').select('-__v');
        if (clientes.length === 0){
           return res.status(404).json({ error: 'Cliente não encontrado' });
        }
        res.status(200).json(clientes);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar cliente pelo nome' });
    }
});

// Consultar cliente pelo ID
router.get('/:id', authenticateToken, async (req, res) => {
    try {
        const cliente = await Cliente.findById(req.params.id).populate('cidade').select('-__v');
        if (cliente) {
            res.status(200).json(cliente);
        } else {
            res.status(404).json({ error: 'Cliente não encontrado' });
        }
    } catch (error) { 
        console.error(error);
        if (error.kind === 'ObjectId') { // aqui é pra verificar se ele nao nao enviou um id completamente invalido, como todo o id é o id basico usado pelo mongodb, existe um padrao em todos eles
            res.status(400).json({ error: 'ID de cliente inválido' });
        } else {
            res.status(500).json({ error: 'Erro ao buscar cliente pelo ID' });
        }
    }
});

// Remover cliente
router.delete('/:id', authenticateToken, async (req, res) => {
    try {
        const result = await Cliente.findByIdAndDelete(req.params.id);
        if (result) {
            res.status(200).json({ message: 'Cliente removido com sucesso' });
        } else {
            res.status(404).json({ error: 'Cliente não encontrado' });
        }
    } catch (error) { 
        console.error(error);
        if (error.kind === 'ObjectId') {
            res.status(400).json({ error: 'ID de cliente inválido' });
        } else {
            res.status(500).json({ error: 'Erro ao remover cliente' });
        }
    }
});

// Alterar o nome do cliente
router.put('/:id', authenticateToken, async (req, res) => {
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
        console.error(error);
        if (error.kind === 'ObjectId') {
            res.status(400).json({ error: 'ID de cliente inválido' });
        } else {
            res.status(500).json({ error: 'Erro ao atualizar cliente' });
        }
    }
});

module.exports = router;
