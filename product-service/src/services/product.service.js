export class ProductService {
    constructor(client) {
        this.client = client
    }

    async getAll() {
        const query = {
            name: 'get-all-products',
            text: 'SELECT p.id, p.title, p.description, p.price, s.count FROM products p\n'
                + 'LEFT JOIN stocks s ON p.id = s.product_id',
        };
        const res = await this.client.query(query);

        return res.rows;
    }

    async getOne(id) {
        const query = {
            name: 'get-one-product',
            text: 'SELECT p.id, p.title, p.description, p.price, s.count FROM products p\n'
                + 'LEFT JOIN stocks s ON p.id = s.product_id\n'
                + 'WHERE p.id = $1',
            values: [id],
        };
        const res = await this.client.query(query);

        return res.rows[0];
    }

    async create(product, count = 0) {
        const { title, description, price } = product;

        // 1. Create a product record
        const productsQuery = {
            name: 'create-product',
            text: 'INSERT INTO products (title, description, price)\n'
                + 'VALUES ($1, $2, $3)\n'
                + 'RETURNING *',
            values: [title, description, price],
        };

        const res = await this.client.query(productsQuery);
        const id = res.rows[0].id;

        // 2. Create a stocks record 
        const stocksQuery = {
            name: 'create-stocks',
            text: 'INSERT INTO stocks (product_id, count)\n'
                + 'VALUES ($1, $2)',
            values: [id, count],
        };

        await this.client.query(stocksQuery);

        return { ...res.rows[0], count };
    }
}