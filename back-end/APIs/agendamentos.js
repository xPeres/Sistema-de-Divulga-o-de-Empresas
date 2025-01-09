import connection from '../db.js';

const agendamentos = {}

agendamentos.pegarAgendamentos = async function (req, res) { 
    const id = req.body['id']

    try {
        const [rows] = await connection.promise().query("SELECT e.id AS ID, e.produtos, e.usuario, e.loja, e.dia, e.horario, e.valor, e.aba, p.id AS LOJA, p.foto  FROM agendamentos e LEFT JOIN empresas p ON e.loja = p.nome WHERE e.usuario = ?", [id])
        if (!rows[1] || !rows[1].produtos) {
            return res.status(404).send({ error: "Produtos não encontrados" });
        }

        const numeros = rows[1].produtos.replace(/[{}]/g, '').split(',').map(Number);
        const [produtos] = await connection.promise().query("SELECT * FROM produtos WHERE lojaID = ? AND id IN (?)", [rows[1].LOJA, numeros])

        const empresas = rows.reduce((acc, item) => {
            
            let agendamento = acc.find(agendamento => agendamento.id === item.id);

            if (!agendamento) {
                agendamento = {
                    aba: []
                };
                acc.push(agendamento);
            }

            if (item.foto) {
                if (item.aba === 1 ? item.aba = "Próximos Agendamentos" : item.aba === 2 ? item.aba = "Concluídos" : item.aba = "Cancelados" )
                agendamento.aba.push({
                    nome: item.aba,
                    id: item.ID,
                    loja: item.loja,
                    dia: item.dia,
                    horario: item.horario,
                    valor: item.valor,
                    foto: item.foto,
                    produtos: []
                })

                produtos.forEach(produto => {
                    agendamento.aba[agendamento.aba.length - 1].produtos.push({
                        titulo: produto.titulo,
                        valor: produto.valor
                    });
                });
                
            }

            return acc
        }, []);

        return res.status(200).send(empresas)

    } catch (err) {
        console.log(err)
        return res.status(500).send({ error: "Erro no banco de dados" })
    }
}

agendamentos.cancelarAgendamento = async function (req,res) {
    const id = req.body['id']

    try {

        const [rows] = await connection.promise().query("UPDATE agendamentos SET aba = 0 WHERE id = ?", [id])

        if (rows) {
            return res.status(200).send("Alterado" )
        }

    } catch (err) {
        console.log(err)
        return res.status(500).send({ error: "Erro no banco de dados" })
    }
}

agendamentos.reagendarAgendamento = async function (req,res) {
    const id = req.body['id']
    const data = req.body['data']

    try {

        const [rows] = await connection.promise().query("SELECT * FROM agendamentos WHERE id = ?", [id])

        if (rows.length > 0) {
            const infos = rows[0]
            await connection.promise().query("INSERT INTO agendamentos(loja,dia,horario,valor,aba,usuario,produtos) VALUES(?,?,?,?,?,?,?)", [ infos.loja, data, infos.horario, infos.valor, 1, infos.usuario, infos.produtos ])

            return res.status(200).send("Reagendado")
        } else {
            return res.status(500).send({ error: "Erro no banco de dados" })
        }

    } catch (err) {
        console.log(err)
        return res.status(500).send({ error: "Erro no banco de dados" })
    }
}

export default agendamentos;