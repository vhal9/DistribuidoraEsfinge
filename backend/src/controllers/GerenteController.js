const connection = require('../database/connection'); 

const autenticacao = require('./AutenticacaoUsuario');

module.exports = {

    async index(request, response){
       
        const gerenteId = request.headers.authorization;
        //verificar permissão
        if(!autenticacao.gerenteAutenticacao(gerenteId)){
            return response.status(401).json({error: 'Operation not permited.'});
        }


        const gerentes = await connection('gerente').select('*');


        return response.json(gerentes);
    },
    async indexID(request, response){
        const {id} = request.params;

        const gerenteId = request.headers.authorization;
        //verificar permissão
        if(!autenticacao.gerenteAutenticacao(gerenteId)){
            return response.status(401).json({error: 'Operation not permited.'});
        }


        const gerentes = await connection('gerente')
            .where('cpfGerente', id)
            .select('*');
        
        return response.json(gerentes);
    },

    async create(request, response){
        const{ cpfGerente, nomeGerente, telefoneGerente, emailGerente, senhaGerente} = request.body;
        try {
            await connection('gerente').insert({
                cpfGerente,
                nomeGerente,
                telefoneGerente,
                emailGerente,
                senhaGerente,
            });
        } catch (error) {
            
            return response.status(500).send();
        }
        return response.status(201).send();
    },
    async put (request, response){
        const {cpfGerente, nomeGerente, telefoneGerente, emailGerente, senhaGerente} = request.body;
        
        const gerenteId = request.headers.authorization;
        //verificar permissão
        if(!autenticacao.gerenteAutenticacao(gerenteId)){
            return response.status(401).json({error: 'Operation not permited.'});
        }

        try {
            await connection('gerente')
                .where('cpfGerente',cpfGerente)
                .update({
                    "nomeGerente": nomeGerente,
                    "telefoneGerente": telefoneGerente,
                    "emailGerente": emailGerente,
                    "senhaGerente": senhaGerente
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
            await connection('gerente').where('cpfGerente', id).delete();
        }catch(error){
            return response.status(500).send(); 
        }
        return response.status(201).send();

    }
}