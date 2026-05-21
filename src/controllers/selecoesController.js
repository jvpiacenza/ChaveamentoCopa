const selecoesModel = require('../models/selecoesModel');

const listar = (req, res) => {
    selecoesModel.getAll((err, results) => {
        if (err) {
            return res.status(500).json(err);
        }

        res.json(results);
    });
};

const cadastrar = (req, res) => {
    const { nome } = req.body;

    selecoesModel.create(nome, (err, results) => {
        if (err) {
            return res.status(500).json(err);
        }

        res.json({
            mensagem: 'Seleção cadastrada!'
        });
    });
};

module.exports = {
    listar,
    cadastrar
};