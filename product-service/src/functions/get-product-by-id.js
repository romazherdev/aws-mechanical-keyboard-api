import { buildHeaders } from '../helpers';
import { useDbConnection } from '../db';
import { ProductService } from '../services';

export async function getProductById(event) {
    const { productId } = event.pathParameters;
    const headers = buildHeaders();

    let product;

    await useDbConnection(async (client) => {
        const service = new ProductService(client)
        product = await service.getOne(productId);
    });

    if (!product) {
        return {
            headers,
            statusCode: 404,
            body: '',
            isBase64Encoded: false,
        };
    }

    return {
        headers,
        statusCode: 200,
        body: JSON.stringify(product),
        isBase64Encoded: false,
    };
}
