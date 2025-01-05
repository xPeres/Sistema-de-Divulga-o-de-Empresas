import mysql from 'mysql2'

const connection = mysql.createConnection({
  host: 'localhost',  
  user: 'root',
  password: '', 
  database: 'maze store' 
});

// Conectar ao banco de dados
connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados: ' + err.stack);
    return;
  }
  console.log('Conectado ao banco de dados MySQL com sucesso!');
});

export default connection;