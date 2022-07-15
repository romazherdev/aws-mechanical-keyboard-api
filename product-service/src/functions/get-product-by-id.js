import { resolve } from '../core';
import { ProductService } from './services';
import { buildHeaders } from '../helpers';

export async function getProductById(event) {
    const { productId } = event.pathParameters;
    const headers = buildHeaders();

    const service = resolve(ProductService);

    const product = await service.getOne(productId);

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
