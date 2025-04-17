import connection from "./Connection.js";

export async function listarAdm() {     
  const comando=`SELECT * FROM adm`;
  const [rows] = await connection.query(comando);
  return rows;
}

export async function criarAdm(adm) {
  const comando=`INSERT INTO adm (nome, email, senha) VALUES (?, ?, ?)`;
  const [rows] = await connection.query(comando, [adm.nome, adm.email, adm.senha]);
  return rows.insertId;
}

