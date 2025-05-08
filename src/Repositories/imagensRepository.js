import connection from "./Connection.js";


export async function enviarImagem(imagem) {
    const comando = `INSERT INTO imagens (caminho, id_variante, id_produto) VALUES (?, ?, ?)`;
    const [rows] = await connection.query(comando, [imagem.caminho, imagem.id_variante, imagem.id_produto]);
    return rows.insertId;
}


export async function buscarImagemPorId(id_imagem) {
    const comando = `SELECT * FROM imagens WHERE id_imagem = ?`;
    const [rows] = await connection.query(comando, [id_imagem]);
    return rows[0];
}

export async function buscarImagensPorProdutoVariante(id_produto, id_variante) {
    let comando = `
        SELECT id_imagens, caminho 
        FROM imagens 
        WHERE id_produto = ? AND id_variantes = ?
    `;
    let [linhas] = await conexao.query(comando, [id_produto, id_variante]);
    return linhas;
}


export async function removerImagem(id_imagem) {
    const comando = `DELETE FROM imagens WHERE id_imagem = ?`;
    const [rows] = await connection.query(comando, [id_imagem]);
    return rows.affectedRows;
}

export async function alterarImagem(imagem) {
    const comando = `UPDATE imagens SET caminho = ? WHERE id_imagem = ?`;
    const [rows] = await connection.query(comando, [imagem.caminho, imagem.id_imagem]);
    return rows.affectedRows;
}

