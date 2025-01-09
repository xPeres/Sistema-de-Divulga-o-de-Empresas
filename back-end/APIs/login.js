import bcrypt from 'bcrypt';
import connection from '../db.js';
const login = {}

login.checkLogin = async function(req, res) {
    const valores = req.body['params'];

    try {
        const [results] = await connection.promise().query('SELECT * FROM usuarios WHERE email = ?', [valores['email']]);
        if (results.length === 1) {

            const usuarioEncontrado = results[0];

            const isMatch = await bcrypt.compare(valores['senha'], usuarioEncontrado['senha']);

            if (isMatch) {
                return res.status(200).send({ nome: usuarioEncontrado['nome'], cargo: usuarioEncontrado['cargo'] }); 
            } else {
                return res.status(401).send({ error: 'Senha incorreta' });
            }
        } else {
            return res.status(404).send({ error: 'Usuário não encontrado' });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).send({ error: 'Erro no Banco de Dados' });
    }
}

login.checkEmail = async function(req, res) {
    const valores = req.body['params'];

    try {
        const [results] = await connection.promise().query('SELECT * FROM usuarios WHERE email = ?', [valores['email']]);
        if (results.length === 1) {
            return res.status(200).send(); 
        } else {
            return res.status(404).send({ error: 'Usuário não encontrado' });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).send({ error: 'Erro no Banco de Dados' });
    }
}

login.criarUsuario = async function (req, res) {
    const valores = req.body['params'];

    try {
        const [rows] = await connection.promise().query('SELECT * FROM usuarios WHERE email = ?', [valores['email']]);

        if (rows.length > 0) {
            return res.status(404).send({ error: 'Usuário já existente' });
        }

        const hashedPassword = await bcrypt.hash(valores['senha'], 10);
        const hashedCPF = await bcrypt.hash(valores['cpf'], 10);
        connection.promise().query('INSERT INTO usuarios(email,senha,nome,cpf,numero,cep,rua,numeroHouse) VALUES(?, ?, ?, ?, ?, ?, ?, ?)', [valores['email'], hashedPassword, valores['nome'], hashedCPF, valores['numero'], valores['cep'], valores['rua'],valores['numeroHouse']]);
        return res.status(200).send({ message: 'Usuário criado com sucesso' });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ error: 'Erro no Banco de Dados' });
    }
}

login.deletarLogin = async function (req, res) {
    const valores = req.body['params'];

    connection.query('SELECT * FROM usuarios WHERE id = ?', [valores['id']], (err, results) => {
        if (err) {
            return res.status(500).send({ error: 'Erro no Banco de Dados' });
        }
    
        if (results.length === 0) {
            return res.status(404).send({ error: 'Usuário não encontrado' });
        }

        connection.query('DELETE FROM usuarios WHERE id = ?', [valores['id']], (err, results) => {
            if (err) {
                return res.status(500).send({ error: 'Erro ao deletar usuário' });
            } else {
                return res.status(200).send('Usuário deletado');
            }
        });
    });
}

export default login;