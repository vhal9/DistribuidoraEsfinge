
exports.up = function(knex) {
    return knex.schema.createTable('produtoVenda', function(table){
        table.integer('idVenda').notNullable();
        table.integer('idProduto').notNullable();
        table.integer('quantidade').notNullable();
        table.decimal('total').notNullable();
        table.primary(['idVenda', 'idProduto']);

        table.foreign('idVenda').references('idVenda').inTable('venda');
        table.foreign('idProduto').references('idProduto').inTable('produto');
    });
};

exports.down = function(knex) {
    return  knex.schema.dropTable('produtoVenda');
};
