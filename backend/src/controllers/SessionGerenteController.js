const connection = require('../database/connection');

module.exports = {
    async create (request, response){
        const {email, senha} = request.body;

        const gerente = await connection('gerente')
            .where('emailGerente', email)
            .select('emailGerente', 'senhaGerente')
            .first();
        
        if(gerente == null){
            return response.status(400).json({error: 'No user found with this email'});
        }
        if(gerente.emailGerente != email || gerente.senhaGerente != senha){
            return response.status(400).json({error: 'incorrect password.'});
        }
        return response.json(gerente);
    }
}