
exports.up = function(knex) {
    return knex.schema.createTable('vendedor', function(table){
        table.string('cpfVendedor').primary();
        table.string('nomeVendedor').notNullable();
        table.string('telefoneVendedor').notNullable();
        table.string('emailVendedor').unique().notNullable();
        table.string('senhaVendedor').notNullable();
        
    });
};

exports.down = function(knex) {
    return  knex.schema.dropTable('vendedor');
};
