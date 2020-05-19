const connection = require("../database/connection");

const autenticacao = require('./AutenticacaoUsuario');

module.exports = {
    async index(request, response){
        const idLogin = request.headers.authorization;
        
        if(!autenticacao.gerenteVendedorAutenticacao(idLogin)){
            return response.status(401).json({error: 'Operation not permited.'});
        }
        
        produtosVenda = await connection('produtoVenda')
            .join('produto', 'produto.idProduto', '=', 'produtoVenda.idProduto')
            .select('produtoVenda.*', 'produto.nomeProduto');
        return response.json(produtosVenda);

    },
    async indexID(request, response){
        const {id} = request.params;
        const idLogin = request.headers.authorization;
        
        if(!autenticacao.gerenteVendedorAutenticacao(idLogin)){
            return response.status(401).json({error: 'Operation not permited.'});
        }
        
        produtosVenda = await connection('produtoVenda')
            .where('idVenda', id)
            .join('produto', 'produto.idProduto', '=', 'produtoVenda.idProduto')
            .select('produtoVenda.*', 'produto.nomeProduto');
        return response.json(produtosVenda);
    },
    async create(request, response){
        const {idVenda, idProduto, quantidade, total} = request.body;

        const idLogin = request.headers.authorization;
        
        if(!autenticacao.gerenteVendedorAutenticacao(idLogin)){
            return response.status(401).json({error: 'Operation not permited.'});
        }
        

        try {
            //verificar a disponibilidade no estoque
            
            estoque = await connection('produto')
                .where('idProduto', idProduto)
                .select('estoqueProduto');
            estoqueProduto = estoque[0]['estoqueProduto'];
            if (estoqueProduto < quantidade){
                return response.status(401).send();
            }
            
                
            estoqueProduto = estoqueProduto - quantidade;
            await connection('produto')
                .where('idProduto', idProduto)
                .update({
                    'estoqueProduto': estoqueProduto
                });

            // atualizar valor na venda

            totalVenda = await connection('venda')
                .where('idVenda', idVenda)
                .select('totalVenda');
            totalVenda = totalVenda[0]['totalVenda'];
            totalVenda = totalVenda + total;

            await connection('venda')
                .where('idVenda', idVenda)
                .update({
                    'totalVenda': totalVenda
                });

            //inserir produto na venda
            await connection('produtoVenda').insert({
                idVenda,
                idProduto,
                quantidade,
                total
            });
            return response.status(201).send();
        } catch (error) {
            return response.status(500).send();
        }
    },
    async put(request, response){
        const {idVenda, idProduto, quantidade, total} = request.body;

        const idLogin = request.headers.authorization;
        
        if(!autenticacao.gerenteVendedorAutenticacao(idLogin)){
            return response.status(401).json({error: 'Operation not permited.'});
        }
        
        try{
            //se a quantidade mudar para 0, temos que excluir
            if(quantidade <= 0 ){
                //consultar valor e quantidade do produto no pedido
                const dados = await connection('produtoVenda')
                    .where('idVenda', idVenda)
                    .where('idProduto', idProduto)
                    .select('total', 'quantidade');
                
                totalAntigo = dados[0]['total']
                quantidadeAntiga = dados[0]['quantidade']
                
                //atualizar estoque, diminuir do estoque a quantidade do produto

                const estoque = await connection('produto')
                    .where('idProduto', idProduto)
                    .select('estoqueProduto')
                estoqueProduto = estoque[0]['estoqueProduto']
                estoqueProduto = estoqueProduto + quantidadeAntiga;

                await connection('produto')
                    .where('idProduto', idProduto)
                    .update({
                        'estoqueProduto':estoqueProduto
                    })
                
                //atualizar total da venda, remover o total do produto no total da venda
                totalVenda = await connection('venda')
                    .where('idVenda', idVenda)
                    .select('totalVenda')

                totalVenda = totalVenda[0]['totalVenda'];
                totalVenda = totalVenda - totalAntigo;
                
                await connection('venda')
                    .where('idVenda', idVenda)
                    .update({
                        'totalVenda':totalVenda
                    })

                //deletar o registro
                
                await connection('produtoVenda')
                    .where('idVenda', idVenda)
                    .where('idProduto', idProduto)
                    .delete()
            }
            else{
                //verificar se a quantidade muda
                dados = await connection('produtoVenda')
                    .where('idProduto', idProduto)
                    .where('idVenda', idVenda)
                    .select('total', 'quantidade');
                totalProdutoAntigo = dados[0]['total'];
                quantidadeProdutoAntigo= dados[0]['quantidade'];

                quantidadeNova = quantidade - quantidadeProdutoAntigo;
                totalProdutoNovo = total - totalProdutoAntigo;

                if(quantidade != quantidadeProdutoAntigo){
                    //verificar a disponibilidade no estoque
                    estoque = await connection('produto')
                        .where('idProduto', idProduto)
                        .select('estoqueProduto');
                    estoqueProduto = estoque[0]['estoqueProduto'];
                    
                    if (estoqueProduto < quantidadeNova){
                        return response.status(401).send();
                    }
                    estoqueProduto = estoqueProduto - quantidadeNova;
                    await connection('produto')
                        .where('idProduto', idProduto)
                        .update({
                            'estoqueProduto': estoqueProduto
                        });

                }
                if(total != totalProdutoAntigo){
                    //atualizar valor da venda
                    totalVenda = await connection('venda')
                        .where('idVenda', idVenda)
                        .select('totalVenda');
                    totalVenda = totalVenda[0]['totalVenda'];
                    totalVenda = totalVenda + totalProdutoNovo;

                    await connection('venda')
                        .where('idVenda', idVenda)
                        .update({
                            'totalVenda': totalVenda
                        });
                }
                await connection('produtoVenda')
                    .where('idVenda', idVenda)
                    .where('idProduto', idProduto)
                    .update({
                        'total':total,
                        'quantidade':quantidade
                    });
                
            }
            return response.status(201).send();
            
        } catch(error){
            return response.status(500).send();
        }
    },
    async delete(request, response){
        const {idVenda, idProduto} = request.body;

        const idLogin = request.headers.authorization;
        
        if(!autenticacao.gerenteVendedorAutenticacao(idLogin)){
            return response.status(401).json({error: 'Operation not permited.'});
        }
        
        
        try {
            //consultar valor e quantidade do produto no pedido
            const dados = await connection('produtoVenda')
                .where('idVenda', idVenda)
                .where('idProduto', idProduto)
                .select('total', 'quantidade');
            
            total = dados[0]['total']
            quantidade = dados[0]['quantidade']
            
            //atualizar estoque, diminuir do estoque a quantidade do produto

            const estoque = await connection('produto')
                .where('idProduto', idProduto)
                .select('estoqueProduto')
            estoqueProduto = estoque[0]['estoqueProduto']
            estoqueProduto = estoqueProduto + quantidade;

            await connection('produto')
                .where('idProduto', idProduto)
                .update({
                    'estoqueProduto':estoqueProduto
                })
            

            //atualizar total da venda, remover o total do produto no total da venda
            totalVenda = await connection('venda')
                .where('idVenda', idVenda)
                .select('totalVenda')

            totalVenda = totalVenda[0]['totalVenda'];
            totalVenda = totalVenda - total;
            
            await connection('venda')
                .where('idVenda', idVenda)
                .update({
                    'totalVenda':totalVenda
                })
            

            //deletar o registro
            
            await connection('produtoVenda')
                .where('idVenda', idVenda)
                .where('idProduto', idProduto)
                .delete()
            
            
            return response.status(201).send();
        } catch (error) {
            return response.status(500).send();
        }

    }
}