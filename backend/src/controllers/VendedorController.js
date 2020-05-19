const connection = require('../database/connection'); 

const autenticacao = require('./AutenticacaoUsuario');


module.exports = {
    async index(request, response){
        const gerenteId = request.headers.authorization;
        //verificar permissão
        if(!autenticacao.gerenteAutenticacao(gerenteId)){
            return response.status(401).json({error: 'Operation not permited.'});
        }
    

        const vendedores = await connection('vendedor').select('*');

        return response.json(vendedores);
        
    },
    async indexID(request, response){
        const {id} = request.params;
        const idLogin = request.headers.authorization;
        
        if(!autenticacao.gerenteVendedorAutenticacao(idLogin)){
            return response.status(401).json({error: 'Operation not permited.'});
        }

        const vendedores = await connection('vendedor')
            .where('cpfVendedor', id)
            .select('*');

        return response.json(vendedores);
        
    },
    async create(request, response){
        const{ cpfVendedor, nomeVendedor, telefoneVendedor, emailVendedor, senhaVendedor} = request.body;
        const gerenteId = request.headers.authorization;
        //verificar permissão
        if(!autenticacao.gerenteAutenticacao(gerenteId)){
            return response.status(401).json({error: 'Operation not permited.'});
        }
        
        try {
            await connection('vendedor').insert({
                cpfVendedor,
                nomeVendedor,
                telefoneVendedor,
                emailVendedor,
                senhaVendedor,
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
            await connection('vendedor').where('cpfVendedor', id).delete();
        } catch (error) {
            return response.status(500).send(); 
        }
        return response.status(201).send();
    },
    async put(request, response){
        const{ cpfVendedor, nomeVendedor, telefoneVendedor, emailVendedor, senhaVendedor} = request.body;
        const idLogin = request.headers.authorization;
        
        if(!autenticacao.gerenteVendedorAutenticacao(idLogin)){
            return response.status(401).json({error: 'Operation not permited.'});
        }
        try {
            await connection('vendedor')
                .where('cpfVendedor',cpfVendedor)
                .update({
                    'nomeVendedor': nomeVendedor,
                    'telefoneVendedor':telefoneVendedor,
                    'emailVendedor': emailVendedor,
                    'senhaVendedor':senhaVendedor
                });
        } catch (error) {
            return response.status(500).send(); 
        }
        return response.status(201).send();
    }
}