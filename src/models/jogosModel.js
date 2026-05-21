const db = require('../config/db');

const getAll = (callback) => {

    const sql = `
        SELECT
            j.id,

            sa.nome AS selecao_a,
            sb.nome AS selecao_b,

            j.data_hora

        FROM jogos j

        JOIN selecoes sa
            ON j.selecao_a = sa.id

        JOIN selecoes sb
            ON j.selecao_b = sb.id
    `;

    db.query(sql, callback);
};

const create = (
    selecao_a,
    selecao_b,
    data_hora,
    callback
) => {

    const sql = `
        INSERT INTO jogos
        (selecao_a, selecao_b, data_hora)
        VALUES (?, ?, ?)
    `;

    db.query(
        sql,
        [selecao_a, selecao_b, data_hora],
        callback
    );
};

module.exports = {
    getAll,
    create
};