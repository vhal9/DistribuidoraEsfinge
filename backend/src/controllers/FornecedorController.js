const connection = require('../database/connection'); 

const autenticacao = require('./AutenticacaoUsuario');

module.exports = {
    async index(request, response){
        const gerenteId = request.headers.authorization;
        
        //verificar permissão
        if(!autenticacao.gerenteAutenticacao(gerenteId)){
            return response.status(401).json({error: 'Operation not permited.'});
        }

        const fornecedores = await connection('fornecedor').select('*');

        return response.json(fornecedores);
        
    },
    async indexID(request, response){
        const {id} = request.params;

        const gerenteId = request.headers.authorization;
        //verificar permissão
        if(!autenticacao.gerenteAutenticacao(gerenteId)){
            return response.status(401).json({error: 'Operation not permited.'});
        }

        const fornecedor = await connection('fornecedor')
            .where('cnpjFornecedor', id)
            .select('*');

        return response.json(fornecedor);
        
    },
    async create(request, response){
        const{ cnpjFornecedor, nomeFornecedor, telefoneFornecedor, emailFornecedor} = request.body;
        
        const gerenteId = request.headers.authorization;
        //verificar permissão
        if(!autenticacao.gerenteAutenticacao(gerenteId)){
            return response.status(401).json({error: 'Operation not permited.'});
        }

        try {
            await connection('fornecedor').insert({
                cnpjFornecedor,
                nomeFornecedor,
                telefoneFornecedor,
                emailFornecedor
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

        try {
            await connection('fornecedor').where('cnpjFornecedor', id).delete();
        } catch (error) {
            return response.status(500).send(); 
        }
        return response.status(201).send();
    },
    async put(request, response){
        const{ cnpjFornecedor, nomeFornecedor, telefoneFornecedor, emailFornecedor} = request.body;
        
        const gerenteId = request.headers.authorization;
        //verificar permissão
        if(!autenticacao.gerenteAutenticacao(gerenteId)){
            return response.status(401).json({error: 'Operation not permited.'});
        }

        try {
            await connection('fornecedor')
                .where('cnpjFornecedor',cnpjFornecedor)
                .update({
                    'nomeFornecedor': nomeFornecedor,
                    'telefoneFornecedor':telefoneFornecedor,
                    'emailFornecedor': emailFornecedor
                });
        } catch (error) {
            return response.status(500).send(); 
        }
        return response.status(201).send();
    }
}