const connection = require('../database/connection'); 

const autenticacao = require('./AutenticacaoUsuario');

module.exports = {
    async index(request, response){
        const idVendedor = request.headers.authorization;
        
        if(!autenticacao.gerenteVendedorAutenticacao(idVendedor)){
            return response.status(401).json({error: 'Operation not permited.'});
        }

        const clientes =  await connection('cliente')
        	.where('cpfVendedor', idVendedor)
        	.select('*');
        return response.json(clientes);
    }
}