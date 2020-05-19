
exports.up = function(knex) {
    return knex.schema.createTable('compra', function(table){
        table.increments('idCompra').primary();
        table.string('idGerente').notNullable();
        table.string('idFornecedor').notNullable();
        table.decimal('totalCompra').notNullable();
        table.date('dataCompra').notNullable();

        table.foreign('idGerente').references('cpfGerente').inTable('gerente');
        table.foreign('idFornecedor').references('cnpjFornecedor').inTable('fornecedor');
    });
};

exports.down = function(knex) {
    return  knex.schema.dropTable('compra');
};
