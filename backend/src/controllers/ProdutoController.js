const connection = require('../database/connection'); 

const autenticacao = require('./AutenticacaoUsuario');


module.exports = {
    async index(request, response){
        const idLogin = request.headers.authorization;
        
        if(!autenticacao.gerenteVendedorAutenticacao(idLogin)){
            return response.status(401).json({error: 'Operation not permited.'});
        }
        
        produtos = await connection('produto').select('*');
        return response.json(produtos);
    },

    async indexID(request, response){
        const {id} = request.params;
        const idLogin = request.headers.authorization;
        
        if(!autenticacao.gerenteVendedorAutenticacao(idLogin)){
            return response.status(401).json({error: 'Operation not permited.'});
        }
        produtos = await connection('produto')
            .where('idProduto', id)
            .select('*');
        return response.json(produtos);


    },
    async create(request, response){
        const { nomeProduto, marcaProduto, estoqueProduto, precoAtualProduto} = request.body;
        
        const gerenteId = request.headers.authorization;
        //verificar permissão
        if(!autenticacao.gerenteAutenticacao(gerenteId)){
            return response.status(401).json({error: 'Operation not permited.'});
        }

        try {
            await connection('produto').insert({
                nomeProduto,
                marcaProduto,
                estoqueProduto,
                precoAtualProduto,
            });
            
        } catch (error) {
            return response.status(500).send(); 
        }
        return response.status(201).send();
    },
    async put(request, response){
        const {idProduto, nomeProduto, marcaProduto, estoqueProduto, precoAtualProduto} = request.body;
        
        const gerenteId = request.headers.authorization;
        //verificar permissão
        if(!autenticacao.gerenteAutenticacao(gerenteId)){
            return response.status(401).json({error: 'Operation not permited.'});
        }

        try {
            await connection('produto')
                .where('idProduto',idProduto)
                .update({
                    "nomeProduto": nomeProduto,
                    "marcaProduto": marcaProduto,
                    "estoqueProduto": estoqueProduto,
                    "precoAtualProduto": precoAtualProduto
                });
            
        } catch (error) {
            return response.status(500).send(); 
        }
        return response.status(201).send();
    },
    async delete(request, response){
        const {id} = request.params;
        
        const gerenteId = request.headers.authorization;
        //verificar permissão
        if(!autenticacao.gerenteAutenticacao(gerenteId)){
            return response.status(401).json({error: 'Operation not permited.'});
        }

        try{
            await connection('produto').where('idProduto', id).delete();
        }catch(error){
            return response.status(500).send(); 
        }
        return response.status(201).send();
    }
}