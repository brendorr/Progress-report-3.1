const mongoose = require('mongoose');

const CidadeSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    estado: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Cidade', CidadeSchema);