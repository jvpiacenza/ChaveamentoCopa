const model = require('../models/jogosModel');

const listar = (req, res) => {

    model.getAll((err, results) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json(results);
    });
};

const cadastrar = (req, res) => {

    const {
        selecao_a,
        selecao_b,
        data_hora
    } = req.body;

    model.create(
        selecao_a,
        selecao_b,
        data_hora,
        (err, results) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json({
                mensagem: 'Jogo cadastrado!'
            });
        }
    );
};

module.exports = {
    listar,
    cadastrar
};