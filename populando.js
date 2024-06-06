const mongoose = require('mongoose');
const Cidade = require('./models/Cidade');
const Cliente = require('./models/Cliente');
const connectDB = require('./models/database');

const populando = async () => {
    await connectDB();

    // estabelecendo os dados
    const cidades = [
        { nome: 'São Paulo', estado: 'SP' },
        { nome: 'Rio de Janeiro', estado: 'RJ' },
        { nome: 'Belo Horizonte', estado: 'MG' }
    ];

    const clientes = [
        { nomeCompleto: 'João Silva', sexo: 'Masculino', dataNascimento: '1990-01-01', idade: 34, cidadeNome: 'São Paulo' },
        { nomeCompleto: 'Maria Oliveira', sexo: 'Feminino', dataNascimento: '1985-05-15', idade: 39, cidadeNome: 'Rio de Janeiro' },
        { nomeCompleto: 'Carlos Souza', sexo: 'Masculino', dataNascimento: '2000-07-20', idade: 23, cidadeNome: 'Belo Horizonte' }
    ];

    try {
        // limpando os dados ja existentes no banco
        await Cidade.deleteMany({});
        await Cliente.deleteMany({});

        // inserindo cidades
        const savedCidades = await Cidade.insertMany(cidades);
        console.log('Cidades adicionadas:', savedCidades);

        // inserindo clientes
        for (let cliente of clientes) {
            const cidade = await Cidade.findOne({ nome: cliente.cidadeNome });
            if (cidade) {
                const newCliente = new Cliente({
                    nomeCompleto: cliente.nomeCompleto,
                    sexo: cliente.sexo,
                    dataNascimento: cliente.dataNascimento,
                    idade: cliente.idade,
                    cidade: cidade._id
                });
                await newCliente.save();
            }
        }
        console.log('Clientes adicionados com sucesso');

        mongoose.connection.close();
    } catch (error) {
        console.error('Erro ao popular o banco de dados:', error);
        mongoose.connection.close();
    }
};

populando();
