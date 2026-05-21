const db = require('../config/db');

const getAll = (callback) => {
    const sql = `
        SELECT
            gs.id_grupo,
            gs.id_selecao,
            g.descricao AS grupo,
            s.nome AS selecao
        FROM grupos_selecoes gs
        JOIN grupos g
            ON gs.id_grupo = g.id
        JOIN selecoes s
            ON gs.id_selecao = s.id
    `;

    db.query(sql, callback);
};

const create = (id_grupo, id_selecao, callback) => {
    const sql = `
        INSERT INTO grupos_selecoes
        (id_grupo, id_selecao)
        VALUES (?, ?)
    `;

    db.query(
        sql,
        [id_grupo, id_selecao],
        callback
    );
};

module.exports = {
    getAll,
    create
};