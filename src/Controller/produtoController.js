import * as produtoRepository from "../Repositories/produtoRepository.js";
import { removerVariantes, buscarVariantesPorProduto } from "../Repositories/variantesRepository.js";
import { removerImagem,buscarImagemPorProduto } from "../Repositories/imagensRepository.js";
import { Router } from "express";
const endpoints = Router();

endpoints.get("/produto", async (req, resp) => {
  let registros = await produtoRepository.listarProdutos();
  resp.send(registros);
});

endpoints.get("/produto/:id",async (req,resp)=>{
  let id = req.params.id;
  let registro=await produtoRepository.buscarProdutoPorId(id);
  resp.send(registro);
})

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
  try{
    let id = req.params.id;
  
    let imagens = await buscarImagemPorProduto(id);
    if(imagens){
      for(let i=0; i<imagens.length; i++){
        await removerImagem(imagens[i].id_imagens);
      }
    }

    let variantes = await buscarVariantesPorProduto(id);
    if(variantes.length>0){
      for(let i=0; i<variantes.length; i++){
        let id_variante = variantes[i].id_variantes;
        await removerVariantes(id_variante);
      }
    }
    await produtoRepository.removerProduto(id);

    resp.status(200).send({ message: "Produto removido com sucesso" });
  }catch(erro){
    resp.status(400).send({message: erro.message});
  }
});

export default endpoints;