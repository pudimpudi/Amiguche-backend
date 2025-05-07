import connection from "./Connection.js";
import multer from 'multer';

let uploadImagem = multer({ dest: './storage/img' });

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

