import { buildHeaders } from '../helpers';
import { useDbConnection } from '../db';
import { ProductService } from '../services';

export async function createProduct(event) {
    const { count, ...productDto } = JSON.parse(event.body);
    const headers = buildHeaders();

    let product;

    await useDbConnection(async (client) => {
        const service = new ProductService(client)
        product = await service.create(productDto, count);
    });
    
    return {
        headers,
        statusCode: 200,
        body: JSON.stringify(product),
        isBase64Encoded: false,
    };
}
