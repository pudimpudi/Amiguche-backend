import * as imagemRepository from '../Repository/imagemRepository.js';
import e, {Router} from 'express';
const endpoints = Router();


endpoints.post('/imagem/:id_produto/:id_variante', uploadImagem.single('imagem'), async (req, resp) => {
    let imagem = req.file;
    let novoId = await imagemRepository.enviarImagem({
        caminho: req.file.path,
        id_produto: req.params.id_produto,
        id_variante: req.params.id_variante
    });
});

endpoints.delete('/imagem/:id', async (req, resp) => {
    let id = req.params.id;
    await imagemRepository.removerImagem(id);
    resp.send({ message: "Imagem removida com sucesso" });
});

endpoints.get('/imagem/:id', async (req, resp) => {
    let id = req.params.id;
    let imagem = await imagemRepository.buscarImagemPorId(id);
    if (!imagem) {
        return resp.status(404).send({ message: "Imagem não encontrada" });
    }
    resp.send(imagem);
});

endpoints.put('/imagem/:id', uploadImagem.single('imagem'), async (req, resp) => {
    let id = req.params.id;
    let imagem = req.file;

    if (!imagem) {
        return resp.status(400).send({ message: "Nenhuma imagem foi enviada" });
    }

    let updated = await imagemRepository.alterarImagem({
        id_imagem: id,
        caminho: imagem.path
    });

    if (!updated) {
        return resp.status(404).send({ message: "Imagem não encontrada" });
    }

    resp.send({ message: "Imagem atualizada com sucesso" });
});

export default endpoints;