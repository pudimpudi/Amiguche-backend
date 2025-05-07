import * as produtoRepository from "../Repositories/produtoRepository.js";
import { Router } from "express";
const endpoints = Router();

endpoints.get("/produto", async (req, resp) => {
  let registros = await produtoRepository.listarProdutos();
  resp.send(registros);
});

endpoints.post("/produto", async (req, resp) => {
  let produto = req.body;

  let novoId = await produtoRepository.criarProduto(produto);
  resp.send({ novoId });
});

endpoints.put("/produto/:id", async (req, resp) => {
  let id = req.params.id;
  let produto = req.body;

  await produtoRepository.alterarProduto(id, produto);
  resp.send({ message: "Produto atualizado com sucesso" });
});

endpoints.delete("/produto/:id", async (req, resp) => {
  let id = req.params.id;

  await produtoRepository.removerProduto(id);
  resp.send({ message: "Produto removido com sucesso" });
});

export default endpoints;