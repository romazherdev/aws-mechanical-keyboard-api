import { ProductService, resolve } from '../core';

export async function getProductById(event) {
    const { productId } = event.pathParameters;
    const service = resolve(ProductService);

    const product = await service.getOne(productId);

    if (!product) {
        return {
            statusCode: 404,
            body: '',
            headers: {},
            isBase64Encoded: false,
        };
    }

    return {
        statusCode: 200,
        body: JSON.stringify(product),
        headers: {},
        isBase64Encoded: false,
    };
}
