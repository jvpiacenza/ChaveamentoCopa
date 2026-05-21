const db = require('../config/db');

const getAll = (callback) => {
    db.query(
        'SELECT * FROM grupos',
        callback
    );
};

const create = (descricao, callback) => {
    db.query(
        'INSERT INTO grupos (descricao) VALUES (?)',
        [descricao],
        callback
    );
};

module.exports = {
    getAll,
    create
};