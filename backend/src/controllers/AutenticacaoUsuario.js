const connection = require('../database/connection'); 


module.exports = {
    async gerenteAutenticacao(id){
        const gerente = await connection('gerente')
            .where('cpfGerente', id)
            .select('cpfGerente')
            .first();
        
        if(gerente == null || gerente.cpfGerente != id){
            return false;
        }
        return true;
    },
    async gerenteVendedorAutenticacao(id){
        const gerente = await connection('gerente')
            .where('cpfGerente', id)
            .select('cpfGerente')
            .first();
        const vendedor = await connection('vendedor')
            .where('cpfVendedor', id)
            .select('cpfVendedor')
            .first();
        
        if(gerente == null && vendedor == null ){
            return false;
        }
        return true;
    }
};