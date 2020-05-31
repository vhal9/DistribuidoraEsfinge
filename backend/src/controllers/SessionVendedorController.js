const connection = require('../database/connection');

module.exports = {
    async create (request, response){
        const {email, senha} = request.body;

        const vendedor = await connection('vendedor')
            .where('emailVendedor', email)
            .select('emailVendedor', 'senhaVendedor', 'nomeVendedor', 'cpfVendedor')
            .first();
        
        if(vendedor == null){
            return response.status(400).json({error: 'No user found with this email'});
        }
        if(vendedor.emailVendedor != email || vendedor.senhaVendedor != senha){
            return response.status(400).json({error: 'Incorrect password.'});
        }
        return response.json(vendedor);
    }
}