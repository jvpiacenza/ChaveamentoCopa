const db = require('../config/db');

const getAll = (callback) => {
    db.query('SELECT * FROM selecoes', callback);
};

const create = (nome, callback) => {
    db.query(
        'INSERT INTO selecoes (nome) VALUES (?)',
        [nome],
        callback
    );
};

module.exports = {
    getAll,
    create
};