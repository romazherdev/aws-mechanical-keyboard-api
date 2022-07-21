export const CREATE_TABLES_QUERY = `
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

    CREATE TABLE IF NOT EXISTS products (
        id uuid DEFAULT PRIMARY_KEY uuid_generate_v4(),
        
    );
`;