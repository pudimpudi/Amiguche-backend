import connection from "./Connection.js";

export async function listarProdutos() {
  const comando = ``;
  return rows;
}

export async function criarProduto(produto) {
  const comando = `INSERT INTO produtos (id_produto, nome, categoria) VALUES (?, ?, ?)`;
  const [rows] = await connection.query(comando, [produto.id_produto, produto.nome, produto.categoria]);
  return rows.insertId;
}

export async function alterarProduto(produto) {
  const comando = `UPDATE produtos SET nome = ?, categoria = ? WHERE id_produto = ?`;
  const [rows] = await connection.query(comando, [produto.nome, produto.categoria, produto.id_produto]);
  return rows.affectedRows;
}

export async function removerProduto(id_produto) {
  const comando = `DELETE FROM produtos WHERE id_produto = ?`;
  const [rows] = await connection.query(comando, [id_produto]);
  return rows.affectedRows;
}

export async function buscarProdutoPorId(id_produto) {
  const comando = `SELECT * FROM produtos WHERE id_produto = ?`;
  const [rows] = await connection.query(comando, [id_produto]);
  return rows[0];
}