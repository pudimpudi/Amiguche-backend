import connection from "./Connection.js";

export async function listarProdutos() {
  const comando = `select * from produto`;
  const [rows] = await connection.query(comando);
  return rows;
}

export async function criarProduto(produto) {
  const comando = `INSERT INTO produto (nome) VALUES (?)`;
  const [rows] = await connection.query(comando, [produto.nome]);
  return rows.insertId;
}

export async function alterarProduto(produto) {
  const comando = `UPDATE produto SET nome = ? WHERE id_produto = ?`;
  const [rows] = await connection.query(comando, [produto.nome, produto.id_produto]);
  return rows.affectedRows;
}

export async function removerProduto(id_produto) {
  const comando = `DELETE FROM produto WHERE id_produto = ?`;
  const [rows] = await connection.query(comando, [id_produto]);
  return rows.affectedRows;
}

export async function buscarProdutoPorId(id_produto) {
  const comando = `SELECT * FROM produto WHERE id_produto = ?`;
  const [rows] = await connection.query(comando, [id_produto]);
  return rows[0];
}