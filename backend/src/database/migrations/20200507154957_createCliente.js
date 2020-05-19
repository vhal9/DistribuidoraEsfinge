
exports.up = function(knex) {
    return knex.schema.createTable('cliente', function(table){
        table.string('cnpjCliente').primary();
        table.string('nomeFantasiaCliente').notNullable();
        table.string('telefoneCliente').notNullable();
        table.string('emailCliente').unique().notNullable();
        table.string('enderecoCliente').notNullable();

        table.string('cpfVendedor').notNullable();
        table.foreign('cpfVendedor').references('cpfVendedor').inTable('vendedor');
    });
};

exports.down = function(knex) {
    return  knex.schema.dropTable('cliente');
};
