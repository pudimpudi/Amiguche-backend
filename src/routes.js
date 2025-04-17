import adm from './Controller/admController.js';
import cliente from './Controller/clienteController.js';
import pedidos from './Controller/pedidosController.js';

export default function adcionarRotas(server){
    server.use(adm);
    server.use(cliente);
    server.use(pedidos);
}