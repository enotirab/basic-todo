const {Client} = require('pg');
const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'todos',
    password: 'tnt',
    port: 54329,
});

client.connect();

module.exports = client;


//yes I know this should be in env, this is just an example for someone I'm teaching. Don't judge me!