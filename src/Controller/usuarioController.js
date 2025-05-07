import * as usuarioRepository from '../Repositories/usuarioRepository.js';
import { Router } from 'express';
const endpoints = Router();

//perguntar ao bruno quais endpoints são necessários

endpoints.get('/usuario', async (req, resp) => {
  let registros = await usuarioRepository.listarUsuario();
  resp.send(registros);
})

endpoints.post('/usuario', async (req, resp) => {
  let usuario = req.body;

  let novoId = await usuarioRepository.criarUsuario(usuario);
  resp.send({ novoId })
})

export default endpoints;