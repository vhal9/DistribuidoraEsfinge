const connection = require('../database/connection'); 

const autenticacao = require('./AutenticacaoUsuario');

module.exports = {
    async index(request, response){
        const idLogin = request.headers.authorization;
        
        if(!autenticacao.gerenteVendedorAutenticacao(idLogin)){
            return response.status(401).json({error: 'Operation not permited.'});
        }

        const clientes =  await connection('cliente').select('*');
        return response.json(clientes);
    },
    async indexID(request, response){
        const idLogin = request.headers.authorization;
        const {id} = request.params;

        if(!autenticacao.gerenteVendedorAutenticacao(idLogin)){
            return response.status(401).json({error: 'Operation not permited.'});
        }

        const cliente = await connection('cliente')
            .where('cnpjCliente', id)
            .select('*')
        return response.json(cliente);
        

    },
    async create(request,response){
        const {cnpjCliente, cpfVendedor, nomeFantasiaCliente, telefoneCliente, emailCliente, enderecoCliente} = request.body;
        const gerenteId = request.headers.authorization;

        //verificar permissão
        if(!autenticacao.gerenteAutenticacao(gerenteId)){
            return response.status(401).json({error: 'Operation not permited.'});
        }
        
        try {
            await connection('cliente').insert({
                cnpjCliente,
                cpfVendedor,
                nomeFantasiaCliente,
                telefoneCliente,
                emailCliente,
                enderecoCliente,
            });
        } catch (error) {
            
            return response.status(500).send();
        } 
        
        return response.status(201).send();
    },
    async put(request, response){
        const {cnpjCliente, nomeFantasiaCliente, telefoneCliente, emailCliente, enderecoCliente} = request.body;
        const gerenteId = request.headers.authorization;

        //verificar permissão
        if(!autenticacao.gerenteAutenticacao(gerenteId)){
            return response.status(401).json({error: 'Operation not permited.'});
        }

        try {
            await connection('cliente')
                .where('cnpjCliente',cnpjCliente)
                .update({
                    'nomeFantasiaCliente': nomeFantasiaCliente,
                    'telefoneCliente':telefoneCliente,
                    'emailCliente': emailCliente,
                    'enderecoCliente':enderecoCliente
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
            await connection('cliente').where('cnpjCliente', id).delete();
        } catch (error) {
            return response.status(500).send();
        }
        return response.status(201).send();
    }
}