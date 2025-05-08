import connection from "./Connection.js";

export async function listarVariantes() {
    const comando = `SELECT * FROM variantes`;
    const [rows] = await connection.query(comando);
    return rows;
}

export async function criarVariantes(variante) {
    const comando = `INSERT INTO variantes ( descricao, preco,id_produto) VALUES (?, ?, ?)`;
    const [rows] = await connection.query(comando, [ variante.descricao, variante.preco, variante.id]);
    return rows.insertId;
}

export async function alterarVariantes(variantes) {
    const comando = `UPDATE variantes SET descricao = ?, preco = ? WHERE id_variante = ?`;
    const [rows] = await connection.query(comando, [variantes.descricao, variantes.preco, variantes.id_variante]);
    return rows.affectedRows;
}

export async function removerVariantes(id_variante) {
    const comando = `DELETE FROM variantes WHERE id_variante = ?`;
    const [rows] = await connection.query(comando, [id_variante]);
    return rows.affectedRows;
}

export async function buscarVariantesPorId(id_variante) {
    const comando = `SELECT * FROM variantes WHERE id_variante = ?`;
    const [rows] = await connection.query(comando, [id_variante]);
    return rows[0];
}

export async function buscarVariantesPorProduto(id_produto) {
    const comando = `SELECT * FROM variantes WHERE id_produto = ?`;
    const [rows] = await connection.query(comando, [id_produto]);
    return rows;
}