
exports.up = function(knex) {
    return knex.schema.createTable('produtoCompra', function(table){
        table.integer('idCompra').notNullable();
        table.integer('idProduto').notNullable();
        table.integer('quantidade').notNullable();
        table.decimal('total').notNullable();
        table.primary(['idCompra', 'idProduto']);

        table.foreign('idCompra').references('idCompra').inTable('compra');
        table.foreign('idProduto').references('idProduto').inTable('produto');
    });
};

exports.down = function(knex) {
    return  knex.schema.dropTable('produtoCompra');
};
