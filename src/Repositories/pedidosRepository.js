import connection from "./Connection.js";

// export async function listarPedidos(cliente) {
//     const comando = `SELECT * FROM pedidos WHERE id_cliente = ?`;
//     const [rows] = await connection.query(comando, [id_cliente]);
//     return rows;
// }

// //alterei a função AUTO INCREMENT da tabela pedidos para que varios produtos fiquem salvos no mesmo id de pedido
// export async function criarPedido(pedido) {
//     const comandoMaxId = `SELECT MAX(id_pedido) AS maxId FROM pedidos`;
//     const [result] = await connection.query(comandoMaxId);
//     const maxId = result[0].maxId || 0; // Default to 0 if no rows exist

//     const novoIdPedido = maxId + 1;

//     const comando = `INSERT INTO pedidos (id_pedido, id_cliente, id_produto) VALUES (?, ?, ?)`;
//     const [rows] = await connection.query(comando, [novoIdPedido, pedido.id_cliente, pedido.id_produto]);
//     return novoIdPedido;
// }

// export async function adcionarAoPedido(pedido) {
//     const comando = `INSERT INTO pedidos (id_cliente, id_produto, id_pedido) VALUES (?, ?, ?)`;
//     const [rows] = await connection.query(comando, [pedido.id_cliente, pedido.id_produto, pedido.id_pedido]);
//     return rows.insertId;
// }

// export async function deletarPedido(id_pedido) {
//     const comando = `DELETE FROM pedidos WHERE id_pedido = ?`;
//     const [rows] = await connection.query(comando, [id_pedido]);
//     return rows.affectedRows;
// }

// export async function deletarProdutoPedido(id_pedido, id_produto) {
//     const comando = `DELETE FROM pedidos WHERE id_pedido = ? AND id_produto = ?`;
//     const [rows] = await connection.query(comando, [id_pedido, id_produto]);
//     return rows.affectedRows;
// }

export async function listarPedidos() {
  const comando = `SELECT 
id_pedidos as id,
precoTotal as preco,
status, nome
 FROM pedidos inner join clientes on pedidos.id_clientes=clientes.id_clientes;`;
  const [rows] = await connection.query(comando);
  return rows;
}

export async function listarPedidosPorCliente(id) {
  const comando = `SELECT * FROM pedidos WHERE id_clientes = ?`;
  const [rows] = await connection.query(comando, [id]);
  return rows;
}

export async function criarPedido(pedido) {
  const comando = `INSERT INTO pedidos (data_pedido,precoTotal,status, id_clientes) VALUES (?, ?, ?, ?)`;
  const [rows] = await connection.query(comando, [
    pedido.data,
    pedido.preco,
    pedido.id_cliente,
  ]);
  return rows.insertId;
}

export async function adicionarProduto(produto) {
  const comando = `INSERT INTO pedidos_produtos (quantidade,id_pedidos, id_produto) VALUES (? ,?, ?)`;
  const [rows] = await connection.query(comando, [
    produto.qtd,
    produto.id,
    produto.id_produto,
  ]);
  return rows.insertId;
}

export async function buscarProdutos(id) {
  const comando = `select nome, quantidade from pedidos_produtos inner join produto on pedidos_produtos.id_produto=produto.id_produto where id_pedidos= = ?`;
  const [rows] = await connection.query(comando, [id]);
  return rows;
}

export async function alterarPedido(pedido, id) {
  const comando = `UPDATE pedidos SET precoTotal = ? and status = ? WHERE id_pedidos = ?`;
  const [rows] = await connection.query(comando, [
    pedido.preco,
    pedido.status,
    id,
  ]);
  return rows.affectedRows;
}

export async function deletarPedido(id) {
  const comando = `DELETE FROM pedidos WHERE id_pedidos = ?`;
  const [rows] = await connection.query(comando, [id]);
  return rows.affectedRows;
}
