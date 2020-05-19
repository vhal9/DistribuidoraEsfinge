const express = require('express');

const VendedorController = require('./controllers/VendedorController'); 
const GerenteController = require('./controllers/GerenteController');
const ProdutoController = require('./controllers/ProdutoController');
const ClienteController = require('./controllers/ClienteController');
const FornecedorController = require('./controllers/FornecedorController');
const CompraController = require('./controllers/CompraController');
const ProdutoCompraController = require('./controllers/ProdutoCompraController');
const VendaController = require('./controllers/VendaController');
const ProdutoVendaController = require('./controllers/ProdutoVendaController');
const SessionVendedorController = require('./controllers/SessionVendedorController');
const SessionGerenteController = require('./controllers/SessionGerenteController');


const routes = express.Router();

routes.get('/gerente', GerenteController.index);
routes.get('/gerente/:id', GerenteController.indexID);
routes.put('/gerente', GerenteController.put);
routes.post('/gerente', GerenteController.create);
routes.delete('/gerente/:id', GerenteController.delete);

routes.get('/vendedor', VendedorController.index);
routes.get('/vendedor/:id', VendedorController.indexID);
routes.put('/vendedor', VendedorController.put);
routes.post('/vendedor', VendedorController.create);
routes.delete('/vendedor/:id', VendedorController.delete);

routes.get('/produto', ProdutoController.index);
routes.get('/produto/:id', ProdutoController.indexID);
routes.put('/produto', ProdutoController.put);
routes.post('/produto', ProdutoController.create);
routes.delete('/produto/:id', ProdutoController.delete);

routes.get('/cliente', ClienteController.index);
routes.get('/cliente/:id', ClienteController.indexID);
routes.put('/cliente', ClienteController.put);
routes.post('/cliente', ClienteController.create);
routes.delete('/cliente/:id', ClienteController.delete);

routes.get('/fornecedor', FornecedorController.index);
routes.get('/fornecedor/:id', FornecedorController.indexID);
routes.put('/fornecedor', FornecedorController.put);
routes.post('/fornecedor', FornecedorController.create);
routes.delete('/fornecedor/:id', FornecedorController.delete);

routes.get('/compra', CompraController.index);
routes.get('/compra/:id', CompraController.indexID);
routes.post('/compra', CompraController.create);
routes.put('/compra', CompraController.put);
routes.delete('/compra/:id', CompraController.delete);

routes.get('/produtoCompra', ProdutoCompraController.index);
routes.get('/produtoCompra/:id', ProdutoCompraController.indexID);
routes.post('/produtoCompra', ProdutoCompraController.create);
routes.put('/produtoCompra', ProdutoCompraController.put);
routes.delete('/produtoCompra/', ProdutoCompraController.delete);

routes.get('/venda', VendaController.index);
routes.get('/venda/:id', VendaController.indexID);
routes.post('/venda', VendaController.create);
routes.put('/venda', VendaController.put);
routes.delete('/venda/:id', VendaController.delete);

routes.get('/produtoVenda', ProdutoVendaController.index);
routes.get('/produtoVenda/:id', ProdutoVendaController.indexID);
routes.post('/produtoVenda', ProdutoVendaController.create);
routes.put('/produtoVenda', ProdutoVendaController.put);
routes.delete('/produtoVenda', ProdutoVendaController.delete);

routes.post('/sessionVendedor', SessionVendedorController.create);

routes.post('/sessionGerente', SessionGerenteController.create);

module.exports = routes;