import connection from "./Connection";

export async function listarPedidos() {
    const comando=`SELECT * FROM pedidos WHERE id_cliente = ?`;
    const [rows] = await connection.query(comando, [id_cliente]);
    return rows;
    }

export async function criarPedido(pedido) {
    const comando=`INSERT INTO pedidos (id_cliente, id_produto, quantidade, status) VALUES (?, ?, ?, ?)`;
    const [rows] = await connection.query(comando, [pedido.id_cliente, pedido.id_produto, pedido.quantidade, pedido.status]);
    return rows.insertId;
}