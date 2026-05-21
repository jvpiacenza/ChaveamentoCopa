const express = require('express');

const router = express.Router();

const controller = require('../controllers/jogosController');

router.get('/', controller.listar);

router.post('/', controller.cadastrar);

module.exports = router;