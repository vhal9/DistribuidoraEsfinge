const connection = require('../database/connection'); 

const autenticacao = require('./AutenticacaoUsuario');

module.exports = {
    
    async index(request, response){
        const idLogin = request.headers.authorization;
        
        if(!autenticacao.gerenteVendedorAutenticacao(idLogin)){
            return response.status(401).json({error: 'Operation not permited.'});
        }
        
        const vendas = await connection('venda')
            .join('cliente', 'cliente.cnpjCliente','=','venda.idCliente')
            .select('venda.*','cliente.nomeFantasiaCliente');

        return response.json(vendas);
        
    },
    
    async indexID(request, response){
        const {id} = request.params;
        const idLogin = request.headers.authorization;
        
        if(!autenticacao.gerenteVendedorAutenticacao(idLogin)){
            return response.status(401).json({error: 'Operation not permited.'});
        }

        const venda = await connection('venda')
            .join('cliente', 'cliente.cnpjCliente','=','venda.idCliente')
            .where('idVenda', id)
            .select('venda.*','cliente.nomeFantasiaCliente');

        return response.json(venda);
        
    },
    async create(request, response){
        const{ idCliente, idVendedor, dataVenda, totalVenda} = request.body;
        const idLogin = request.headers.authorization;
        
        if(!autenticacao.gerenteVendedorAutenticacao(idLogin)){
            return response.status(401).json({error: 'Operation not permited.'});
        }

        try {
            const id = await connection('venda').insert({
                idCliente,
                idVendedor,
                dataVenda,
                totalVenda
            });
            idVenda = id[0];
            
            return response.json(idVenda);
            
        } catch (error) {
            console.log(error);
            return response.status(500).send(); 
        }
    },
    
    async put(request, response){
        const{ idVenda,idVendedor, idCliente, dataVenda, totalVenda} = request.body;
        const idLogin = request.headers.authorization;
        
        if(!autenticacao.gerenteVendedorAutenticacao(idLogin)){
            return response.status(401).json({error: 'Operation not permited.'});
        }
        
        try {
            resposta = await connection('venda')
                .where('idVenda',idVenda)
                .update({
                    'idVendedor':idVendedor,
                    'idCliente': idCliente,
                    'totalVenda': totalVenda,
                    'dataVenda': dataVenda
                });
            
            return response.status(201).send();
        } catch (error) {
            return response.status(500).send(); 
        }
        
    },
    async delete(request, response){
        const {id} = request.params;
        const idLogin = request.headers.authorization;
        
        if(!autenticacao.gerenteVendedorAutenticacao(idLogin)){
            return response.status(401).json({error: 'Operation not permited.'});
        }
        try {
            //excluir cada produto e atualizar estoques

            produtosVenda = await connection('produtoVenda')
                .where('idVenda', id)
                .select('*')
            
            
            quantProdutos = produtosVenda.length;
            
            for (var i =0; i < quantProdutos; i++){
                //atualizar estoque do item
                quantidade = produtosVenda[i].quantidade;
                idProduto = produtosVenda[i].idProduto;
                
                estoque = await connection('produto')
                    .where('idProduto', idProduto)
                    .select('estoqueProduto');
                
                estoque = estoque[0]['estoqueProduto'] + quantidade;
                await connection('produto')
                    .where('idProduto', idProduto)
                    .update({
                        'estoqueProduto':estoque
                    });
                await connection('produtoVenda')
                    .where('idProduto', idProduto)
                    .where('idVenda', id)
                    .delete();
                
            }
            await connection('venda').where('idVenda', id).delete();
            
            return response.status(201).send();
        } catch (error) {
            return response.status(500).send(); 
        }
        
    }
}