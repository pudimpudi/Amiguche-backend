import * as admRepository from '../Repository/admRepository.js';
import e, { Router } from 'express';
const endpoints = Router();

//perguntar ao bruno quais endpoints são necessários

endpoints.get('/adm', async (req, resp) => {
  let registros = await admRepository.listarAdm();
  resp.send(registros);
})

endpoints.post('/adm', async (req, resp) => {
  let adm = req.body;

  let novoId = await admRepository.criarAdm(adm);
  resp.send({ novoId })
})