import { buildHeaders } from '../helpers';
import { useDbConnection } from '../db';
import { ProductService } from '../services';

export async function getProductList() {
    const headers = buildHeaders();

    let products;

    await useDbConnection(async (client) => {
        const service = new ProductService(client)
        products = await service.getAll();
    });

    return {
        headers,
        statusCode: 200,
        body: JSON.stringify(products),
        isBase64Encoded: false,
    };
}
