const mongoose = require('mongoose');
require('dotenv').config();

// Conecte-se ao MongoDB
mongoose.connect('mongodb://localhost:27017/meuBancoDeDados', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Conectado ao MongoDB'))
.catch(err => console.error('Erro ao conectar ao MongoDB', err));

// Definindo um modelo simples
const Schema = mongoose.Schema;
const TesteSchema = new Schema({
    nome: String
});
const Teste = mongoose.model('Teste', TesteSchema);

// Inserindo dados de exemplo
const inserirDados = async () => {
    try {
        await Teste.create({ nome: 'Exemplo' });
        console.log('Dados inseridos');
        mongoose.connection.close();
    } catch (error) {
        console.error('Erro ao inserir dados', error);
        mongoose.connection.close();
    }
};

inserirDados();