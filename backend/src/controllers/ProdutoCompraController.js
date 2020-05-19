const connection = require('../database/connection'); 

const autenticacao = require('./AutenticacaoUsuario');

module.exports = {
    async index(request, response){
        const gerenteId = request.headers.authorization;
        //verificar permissão
        if(!autenticacao.gerenteAutenticacao(gerenteId)){
            return response.status(401).json({error: 'Operation not permited.'});
        }


        const produtos = await connection('produtoCompra')
            .join('produto', 'produto.idProduto', '=', 'produtoCompra.idProduto')
            .select('produtoCompra.*', 'produto.nomeProduto')
        return response.json(produtos);
    },
    async indexID(request, response){
        const {id} = request.params;
        const gerenteId = request.headers.authorization;
        //verificar permissão
        if(!autenticacao.gerenteAutenticacao(gerenteId)){
            return response.status(401).json({error: 'Operation not permited.'});
        }


        const produtos = await connection('produtoCompra')
            .join('produto', 'produto.idProduto', '=', 'produtoCompra.idProduto')
            .where('produtoCompra.idCompra', id)
            .select('produtoCompra.*', 'produto.nomeProduto')
        return response.json(produtos);
    },
    async create (request, response){
        const {idCompra, idProduto, quantidade, total} = request.body;
        const gerenteId = request.headers.authorization;
        //verificar permissão
        if(!autenticacao.gerenteAutenticacao(gerenteId)){
            return response.status(401).json({error: 'Operation not permited.'});
        }

        try{
            //inserir produtoCompra
            await connection('produtoCompra').insert({
                idCompra,
                idProduto,
                quantidade,
                total
            });

            //atualizar total da compra na tabela compra
            totalCompra = await connection('compra')
                .where('idCompra', idCompra)
                .select('totalCompra');
            
            totalCompra = totalCompra[0]['totalCompra'];
            totalCompra = totalCompra + parseFloat(total);
            
            await connection('compra')
                .where('idCompra', idCompra)
                .update({
                    'totalCompra':totalCompra
                });
            
            //atualizar o estoque do produto
            estoque = await connection('produto')
                .where('idProduto', idProduto)
                .select('estoqueProduto');
            estoqueProduto = estoque[0]['estoqueProduto'];
            estoqueProduto = estoqueProduto + parseInt(quantidade);

            await connection('produto')
                .where('idProduto', idProduto)
                .update({
                    'estoqueProduto':estoqueProduto
                });
            
            
            return response.status(201).send();
        } catch(error){
            return response.status(500).send();
        }
    },
    
    async put(request, response){
        const {idCompra, idProduto, quantidade, total} = request.body;
        const gerenteId = request.headers.authorization;
        //verificar permissão
        if(!autenticacao.gerenteAutenticacao(gerenteId)){
            return response.status(401).json({error: 'Operation not permited.'});
        }

        try{
            //buscar os dados antigos
            dados = await connection('produtoCompra')
                .where('idProduto', idProduto)
                .where('idCompra', idCompra)
                .select('total', 'quantidade');
            
            totalAux = dados[0]['total'];
            quantidadeAux = dados[0]['quantidade']
            
            if (parseInt(quantidade) > 0){            

                // atualizar a quantidade no estoque
                if (quantidadeAux != parseInt(quantidade)){
                    quantidadeNova = quantidadeAux - quantidade;
                    estoque = await connection('produto')
                        .where('idProduto', idProduto)
                        .select('estoqueProduto')
                    estoqueProduto = estoque[0]['estoqueProduto'];
                    estoqueProduto = estoqueProduto - quantidadeNova;
                    //atualizar
                    
                    await connection('produto')
                        .where('idProduto', idProduto)
                        .update({
                            'estoqueProduto':estoqueProduto
                        });
                }
                // atualizar o total na compra 
                if (totalAux != total){
                    totalNovo = totalAux - total;
                    totalCompra = await connection('compra')
                        .where('idCompra', idCompra)
                        .select('totalCompra')

                    totalCompra = totalCompra[0]['totalCompra'];
                    totalCompra = totalCompra - totalNovo;
                    
                    
                    //atualizar
                    await connection('compra')
                        .where('idCompra', idCompra)
                        .update({
                            'totalCompra':totalCompra
                        });
                }
                // atualizar os valores
                await connection('produtoCompra')
                    .where('idProduto', idProduto)
                    .where('idCompra', idCompra)
                    .update({
                        'total':total,
                        'quantidade':quantidade
                    });
            }
            //caso quantidade seja 0, excluir o produto na compra
            else{
                //atualizar o estoque
                const estoque = await connection('produto')
                    .where('idProduto', idProduto)
                    .select('estoqueProduto')
                estoqueProduto = estoque[0]['estoqueProduto'];
                estoqueProduto = estoqueProduto - quantidadeAux;
                //atualizar
                await connection('produto')
                    .where('idProduto', idProduto)
                    .update({
                        'estoqueProduto':estoqueProduto
                    });
                //atualzaro o total
                totalCompra = await connection('compra')
                    .where('idCompra', idCompra)
                    .select('totalCompra')
                totalCompra = totalCompra[0]['totalCompra'];
                totalCompra = totalCompra - totalAux;
                //atualizar
                await connection('compra')
                    .where('idCompra', idCompra)
                    .update({
                        'totalCompra':totalCompra
                    });
                //deletar o produto da compra
                await connection('produtoCompra')
                    .where('idCompra', idCompra)
                    .where('idProduto', idProduto)
                    .delete();
            }
            return response.status(201).send();
        } catch(error){
            
            return response.status(500).send();
        }
    },

    async delete(request, response){
        const {idCompra, idProduto} = request.body;
        const gerenteId = request.headers.authorization;
        //verificar permissão
        if(!autenticacao.gerenteAutenticacao(gerenteId)){
            return response.status(401).json({error: 'Operation not permited.'});
        }

        try{
            //consultar valor e quantidade
            const dados = await connection('produtoCompra')
                .where('idCompra',idCompra)
                .where('idProduto', idProduto)
                .select('total', 'quantidade')
            total = dados[0]['total']
            quantidade = dados[0]['quantidade']
            
            //atualizar estoque

            const estoque = await connection('produto')
                .where('idProduto', idProduto)
                .select('estoqueProduto')
            estoqueProduto = estoque[0]['estoqueProduto']
            estoqueProduto = estoqueProduto - quantidade;

            await connection('produto')
                .where('idProduto', idProduto)
                .update({
                    'estoqueProduto':estoqueProduto
                })

            //atualizar total da compra
            totalCompra = await connection('compra')
                .where('idCompra', idCompra)
                .select('totalCompra')

            totalCompra = totalCompra[0]['totalCompra'];
            totalCompra = totalCompra - total;
            await connection('compra')
                .where('idCompra', idCompra)
                .update({
                    'totalCompra':totalCompra
                })

            //deletar o registro
            
            await connection('produtoCompra')
            .where('idCompra', idCompra)
            .where('idProduto', idProduto)
            .delete()
        
            return response.status(201).send();
        } catch(error){
           return response.status(500).send();
        }
    }
}
