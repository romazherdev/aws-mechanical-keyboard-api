import { resolve } from '../core';
import { ProductService } from './services';
import { buildHeaders } from '../helpers';

export async function getProductList(event) {
    const headers = buildHeaders();

    const service = resolve(ProductService);
    const products = await service.getAll();

    return {
        headers,
        statusCode: 200,
        body: JSON.stringify(products),
        isBase64Encoded: false,
    };
}
