const connection = require('../database/connection'); 

const autenticacao = require('./AutenticacaoUsuario');

module.exports = {
    
     
    async index(request, response){
        const gerenteId = request.headers.authorization;
        
        //verificar permissão
        if(!autenticacao.gerenteAutenticacao(gerenteId)){
            return response.status(401).json({error: 'Operation not permited.'});
        }

        const compras = await connection('compra')
            .where('compra.idGerente', gerenteId)
            .join('fornecedor', 'fornecedor.cnpjFornecedor','=','compra.idFornecedor')
            .select('compra.*','fornecedor.nomeFornecedor');

        return response.json(compras);
        
    },
    
    async indexID(request, response){
        const {id} = request.params;
        const gerenteId = request.headers.authorization;
        
        //verificar permissão
        if(!autenticacao.gerenteAutenticacao(gerenteId)){
            return response.status(401).json({error: 'Operation not permited.'});
        }


        const compra = await connection('compra')
            .join('fornecedor', 'fornecedor.cnpjFornecedor','=','compra.idFornecedor')
            .where('idCompra', id)
            .select('compra.*','fornecedor.nomeFornecedor');

        return response.json(compra);
        
    },
    async create(request, response){
        const{ idFornecedor, idGerente, dataCompra, totalCompra} = request.body;
        const gerenteId = request.headers.authorization;
        
        //verificar permissão
        if(!autenticacao.gerenteAutenticacao(gerenteId)){
            return response.status(401).json({error: 'Operation not permited.'});
        }

        
        try {
            const id = await connection('compra').insert({
                idFornecedor,
                idGerente,
                dataCompra,
                totalCompra
            });
            idCompra = id[0];
            
            return response.json(idCompra);
            
        } catch (error) {
            return response.status(500).send(); 
        }
    },
    
    async put(request, response){
        const{ idCompra, idFornecedor, idGerente, dataCompra, totalCompra} = request.body;
        const gerenteId = request.headers.authorization;
        
        //verificar permissão
        if(!autenticacao.gerenteAutenticacao(gerenteId)){
            return response.status(401).json({error: 'Operation not permited.'});
        }

        try {
            await connection('compra')
                .where('idCompra',idCompra)
                .update({
                    'idFornecedor': idFornecedor,
                    'idGerente':idGerente,
                    'totalCompra': totalCompra,
                    'dataCompra': dataCompra
                });
            return response.status(201).send();
        } catch (error) {
            return response.status(500).send(); 
        }
        
    },
    async delete(request, response){
        const {id} = request.params;
        const gerenteId = request.headers.authorization;
        
        //verificar permissão
        if(!autenticacao.gerenteAutenticacao(gerenteId)){
            return response.status(401).json({error: 'Operation not permited.'});
        }

        try {
            produtosCompra = await connection('produtoCompra')
                .where('idCompra', id)
                .select('*')
            
            
            quantProdutos = produtosCompra.length;

            for (var i =0; i < quantProdutos; i++){
                //atualizar estoque do item
                quantidade = produtosCompra[i].quantidade;
                idProduto = produtosCompra[i].idProduto;
                
                estoque = await connection('produto')
                    .where('idProduto', idProduto)
                    .select('estoqueProduto');
                
                estoque = estoque[0]['estoqueProduto'] - quantidade;
                
                await connection('produto')
                    .where('idProduto', idProduto)
                    .update({
                        'estoqueProduto':estoque
                    });
                //excluir o produto da compra
                await connection('produtoCompra')
                    .where('idProduto', idProduto)
                    .where('idCompra', id)
                    .delete();
            }

            //excluir a compra
            await connection('compra').where('idCompra', id).delete();
            
            return response.status(201).send();
        } catch (error) {
            return response.status(500).send(); 
        }
        
    }
}