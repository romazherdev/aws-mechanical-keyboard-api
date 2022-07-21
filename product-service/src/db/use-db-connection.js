const { Client } = require('pg')

export async function useDbConnection(callback) {
    const { PG_HOST, PG_PORT, PG_DATABASE, PG_USERNAME, PG_PASSWORD } = process.env;

    const client = new Client({
        host: PG_HOST,
        port: PG_PORT,
        database: PG_DATABASE,
        user: PG_USERNAME,
        password: PG_PASSWORD,
    });

    await client.connect();

    await callback(client);

    client.end();
}
