import * as imagemRepository from "../Repositories/imagensRepository.js";
import e, { Router } from "express";
const endpoints = Router();

import multer from "multer";
const uploadImagem = multer({
  dest: "./storage",
});

endpoints.post(
  "/imagem/:id_produto/:id_variantes",
  uploadImagem.single("imagem"),
  async (req, resp) => {
    let imagem = req.file;
    let novoId = await imagemRepository.enviarImagem({
      caminho: imagem.path,
      tipo: imagem.mimetype,
      id_produto: req.params.id_produto,
      id_variantes: req.params.id_variantes,
    });


    resp
      .status(201)
      .send({ id: novoId, message: "Imagem cadastrada com sucesso" });
  }
);

endpoints.delete("/imagem/:id", async (req, resp) => {
  let id = req.params.id;
  let removed = await imagemRepository.removerImagem(id);
  if (!removed) {
    return resp.status(404).send({ message: "Imagem não encontrada" });
  }
  resp.send({ message: "Imagem removida com sucesso" });
});

endpoints.get("/imagem/:id", async (req, resp) => {
  let id = req.params.id;
  let imagem = await imagemRepository.buscarImagemPorId(id);
  if (!imagem) {
    return resp.status(404).send({ message: "Imagem não encontrada" });
  }
  resp.send(imagem);
});

endpoints.get(
  "/imagem/produto/:id_produto/variante/:id_variante",
  async (req, resp) => {
    let imagens = await imagemRepository.buscarImagensPorProdutoVariante(
      req.params.id_produto,
      req.params.id_variante
    );
    if (!imagens || imagens.length === 0) {
      return resp.status(404).send({ message: "Nenhuma imagem encontrada" });
    }

    resp.send({
      imagens: imagens[0].caminho,
      tipo: imagens[0].tipo
    });
  }
);

endpoints.put(
  "/imagem/:id",
  uploadImagem.single("imagem"),
  async (req, resp) => {
    let id = req.params.id;
    let imagem = req.file;

    if (!imagem) {
      return resp.status(400).send({ message: "Nenhuma imagem foi enviada" });
    }

    let updated = await imagemRepository.alterarImagem({
      id_imagem: id,
      caminho: imagem.path,
      tipo: imagem.mimetype,
    });

    if (!updated) {
      return resp.status(404).send({ message: "Imagem não encontrada" });
    }

    resp.send({ message: "Imagem atualizada com sucesso" });
  }
);

export default endpoints;
