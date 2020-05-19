
exports.up = function(knex) {
    return knex.schema.createTable('fornecedor', function(table){
        table.string('cnpjFornecedor').primary();
        table.string('nomeFornecedor').notNullable();
        table.string('telefoneFornecedor').notNullable();
        table.string('emailFornecedor').notNullable();
    });
};

exports.down = function(knex) {
    return  knex.schema.dropTable('fornecedor');
};
