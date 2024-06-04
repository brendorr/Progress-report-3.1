const mongoose = require('mongoose');

const ClienteSchema = new mongoose.Schema({
    nomeCompleto: { type: String, required: true },
    sexo: { type: String, required: true },
    dataNascimento: { type: Date, required: true },
    idade: { type: Number, required: true },
    cidade: { type: mongoose.Schema.Types.ObjectId, ref: 'Cidade', required: true }
});

module.exports = mongoose.model('Cliente', ClienteSchema);
