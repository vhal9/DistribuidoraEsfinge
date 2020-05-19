
exports.up = function(knex) {
    return knex.schema.createTable('venda', function(table){
        table.increments('idVenda').primary();
        table.string('idVendedor').notNullable();
        table.string('idCliente').notNullable();
        table.float('totalVenda').notNullable();
        table.date('dataVenda').notNullable();

        table.foreign('idVendedor').references('cpfVendedor').inTable('vendedor');
        table.foreign('idCliente').references('cnpjCliente').inTable('cliente');
    });
};

exports.down = function(knex) {
    return  knex.schema.dropTable('venda');
};
