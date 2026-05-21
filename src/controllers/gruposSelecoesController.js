const model = require('../models/gruposSelecoesModel');

const listar = (req, res) => {
    model.getAll((err, results) => {
        if (err) {
            return res.status(500).json(err);
        }

        res.json(results);
    });
};

const cadastrar = (req, res) => {
    const { id_grupo, id_selecao } = req.body;

    model.create(id_grupo, id_selecao, (err, results) => {
        if (err) {
            return res.status(500).json(err);
        }

        res.json({
            mensagem: 'Seleção adicionada ao grupo!'
        });
    });
};

module.exports = {
    listar,
    cadastrar
};