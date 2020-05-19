
exports.up = function(knex) {
    return knex.schema.createTable('gerente', function(table){
        table.string('cpfGerente').primary();
        table.string('nomeGerente').notNullable();
        table.string('telefoneGerente').notNullable();
        table.string('emailGerente').unique().notNullable();
        table.string('senhaGerente').notNullable();
    });
};

exports.down = function(knex) {
    return  knex.schema.dropTable('gerente');
};
