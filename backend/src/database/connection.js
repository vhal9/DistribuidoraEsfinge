const knex = require('knex');
const configuration = require('../../knexfile');

const connection = knex(configuration.development);

connection.client.pool.on('createSuccess', (eventId, resource) => {
    resource.run('PRAGMA foreign_keys = ON', () => {})
});
module.exports = connection;