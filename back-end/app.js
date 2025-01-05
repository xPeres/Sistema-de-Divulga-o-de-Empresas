import express from 'express';
import cors from 'cors';

import login from './APIs/login.js'
import dados from './APIs/pegarDados.js'

const app = express();

app.use(cors());
app.use(express.json());

app.post('/checkLogin', async (req, res) => {
    login.checkLogin(req, res)
});

app.post('/checkEmail', async (req, res) => {
    login.checkEmail(req, res)
});

app.post('/criarUsuario', async (req, res) => {
    login.criarUsuario(req, res)
});

app.post('/deletarLogin', (req, res) => {
    login.deletarLogin(req, res)
});

app.post('/pegarEmpresas', (req, res) => {
    dados.pegarEmpresas(req, res)
});

app.post('/pegarEmpresa', (req, res) => {
    dados.pegarEmpresa(req, res)
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});