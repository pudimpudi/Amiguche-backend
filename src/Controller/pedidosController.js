import * as pedidosRepository from '../Repository/pedidosRepository.js';
import { Router } from 'express';
const endpoints = Router();

endpoints.get('/pedidos', async (req, res) => {
  const { id_cliente } = req.query;
  try {
    const pedidos = await pedidosRepository.listarPedidos(id_cliente);
    res.json(pedidos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao listar pedidos' });
  }
})

endpoints.post('/pedidos', async (req, res) => {
  const pedido = req.body;
  try {
    const novoId = await pedidosRepository.criarPedido(pedido);
    res.status(201).json({ novoId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao criar pedido' });
  }
})

endpoints.post('/pedidos/adicionar', async (req, res) => {
  const pedido = req.body;
  try {
    const novoId = await pedidosRepository.adcionarAoPedido(pedido);
    res.status(201).json({ novoId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao adicionar produto ao pedido' });
  }
})

endpoints.delete('/pedidos/:id', async (req, res) => {
  const id_pedido = req.params.id;
  try {
    await pedidosRepository.deletarPedido(id_pedido);
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao deletar pedido' });
  }
})

endpoints.delete('/pedidos/:id_pedido/produto/:id_produto', async (req, res) => {
  const { id_pedido, id_produto } = req.params;
  try {
    await pedidosRepository.deletarProdutoPedido(id_pedido, id_produto);
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao deletar produto do pedido' });
  }
})

//listagem de pedidos para a véia???
