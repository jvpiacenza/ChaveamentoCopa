require('dotenv').config();

const express = require('express');
const cors = require('cors');

const server = express();

server.use(cors());
server.use(express.json());
server.use(express.static('src/public'));

const selecoesRoutes = require('./src/routes/selecoesRoutes');
const gruposRoutes = require('./src/routes/gruposRoutes');
const gruposSelecoesRoutes = require('./src/routes/gruposSelecoesRoutes');
const jogosRoutes = require('./src/routes/jogosRoutes');

server.use('/selecoes', selecoesRoutes);
server.use('/grupos', gruposRoutes);
server.use('/grupos-selecoes', gruposSelecoesRoutes);
server.use('/jogos', jogosRoutes);

server.listen(process.env.PORT, () => {
    console.log(`Servidor rodando na porta ${process.env.PORT}`);
});