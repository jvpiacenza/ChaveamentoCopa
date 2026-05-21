const gruposModel = require('../models/gruposModel');

const listar = (req, res) => {
    gruposModel.getAll((err, results) => {
        if (err) {
            return res.status(500).json(err);
        }

        res.json(results);
    });
};

const cadastrar = (req, res) => {
    const { descricao } = req.body;

    gruposModel.create(descricao, (err, results) => {
        if (err) {
            return res.status(500).json(err);
        }

        res.json({
            mensagem: 'Grupo cadastrado!'
        });
    });
};

module.exports = {
    listar,
    cadastrar
};