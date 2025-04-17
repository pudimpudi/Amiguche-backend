import connection from "./Connection.js";

export async function listarPedidos(cliente) {
    const comando=`SELECT * FROM pedidos WHERE id_cliente = ?`;
    const [rows] = await connection.query(comando, [id_cliente]);
    return rows;
}

//alterei a função AUTO INCREMENT da tabela pedidos para que varios produtos fiquem salvos no mesmo id de pedido
export async function criarPedido(pedido) {
    const comandoMaxId = `SELECT MAX(id_pedido) AS maxId FROM pedidos`;
    const [result] = await connection.query(comandoMaxId);
    const maxId = result[0].maxId || 0; // Default to 0 if no rows exist

    const novoIdPedido = maxId + 1;

    const comando = `INSERT INTO pedidos (id_pedido, id_cliente, id_produto) VALUES (?, ?, ?)`;
    const [rows] = await connection.query(comando, [novoIdPedido, pedido.id_cliente, pedido.id_produto]);
    return novoIdPedido;
}

export async function adcionarAoPedido(pedido) {
    const comando =`INSERT INTO pedidos (id_cliente, id_produto, id_pedido) VALUES (?, ?, ?)`;
    const [rows] = await connection.query(comando, [pedido.id_cliente, pedido.id_produto, pedido.id_pedido]);
    return rows.insertId;
}

export async function deletarPedido(id_pedido) {
    const comando=`DELETE FROM pedidos WHERE id_pedido = ?`;
    const [rows] = await connection.query(comando, [id_pedido]);
    return rows.affectedRows;
}

export async function deletarProdutoPedido(id_pedido, id_produto) {
    const comando=`DELETE FROM pedidos WHERE id_pedido = ? AND id_produto = ?`;
    const [rows] = await connection.query(comando, [id_pedido, id_produto]);
    return rows.affectedRows;
}