
exports.up = function(knex) {
    return knex.schema.createTable('produto', function(table){
        table.increments('idProduto').primary();
        table.string('nomeProduto').notNullable();
        table.string('marcaProduto').notNullable();
        table.integer('estoqueProduto').notNullable();
        table.decimal('precoAtualProduto').notNullable();
    });
};

exports.down = function(knex) {
    return  knex.schema.dropTable('produto');
};
