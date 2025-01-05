import connection from '../db.js';
const dados = {}

dados.pegarEmpresas = async function (req,res) {
    try {
        const [results] = await connection.promise().query('SELECT e.id AS id, e.nome, e.endereco, e.desc, e.avaliacoes, e.estrelas, e.foto, p.titulo, p.descP, p.valor FROM empresas e LEFT JOIN produtos p ON e.id = p.lojaID');
        if (results.length > 1) {
            const empresas = results.reduce((acc, item) => {

              // Verifica se já existe a loja no acumulador
              let loja = acc.find(loja => loja.id === item.id);

              if (!loja) {
                loja = {
                  id: item.id,
                  nome: item.nome,
                  desc: item.desc,
                  loc: item.endereco,
                  avaliacao: item.avaliacoes,
                  estrelas: item.estrelas,
                  logo: item.foto,
                  produtos: []
                };
                acc.push(loja);
              }

              if (item.titulo) {
                loja.produtos.push({
                  titulo: item.titulo,
                  descricao: item.descP,
                  valor: item.valor
                });
              }
                
              return acc;
            }, []);

            return res.status(200).send(empresas)
        } else {
            return res.status(401).send({ error: "Usuário não encontrado" })
        }


    } catch(err) {
        console.log(err)
        return res.status(500).send({ error: 'Erro no Banco de Dados' })
    }
}

dados.pegarEmpresa = async function (req,res) {
  try {
      const [results] = await connection.promise().query('SELECT e.id AS id, e.nome, e.numero, e.endereco, e.desc, e.avaliacoes, e.estrelas, e.foto, p.titulo, p.descP, p.valor, p.aba FROM empresas e LEFT JOIN produtos p ON e.id = p.lojaID');

      if (results.length > 1) {
        const empresas = results.reduce((acc, item) => {
          if (req['body'].id == item.id) {
            let loja = acc.find(loja => loja.id === item.id);
            if (!loja) {
              loja = {
                id: item.id,
                nome: item.nome,
                desc: item.desc,
                loc: item.endereco,
                avaliacao: item.avaliacoes,
                estrelas: item.estrelas,
                logo: item.foto,
                numero: item.numero,
                aba: [],
                produtos: []
              };
              acc.push(loja);
            }

            if (item.titulo && item.aba) {
              loja.produtos.push({
                titulo: item.titulo,
                descricao: item.descP,
                valor: item.valor
              });

              loja.aba.push({
                nome: item.aba,
                titulo: item.titulo,
                descricao: item.descP,
                valor: item.valor
              })
            }
            
            return acc;
          } else {
            return acc
          }
        }, []);

        return res.status(200).send(empresas)
      } else {
          return res.status(401).send({ error: "Usuário não encontrado" })
      }


  } catch(err) {
      console.log(err)
      return res.status(500).send({ error: 'Erro no Banco de Dados' })
  }
}

export default dados