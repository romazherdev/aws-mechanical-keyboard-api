import { ProductService } from '../core';
import { resolve } from '../core/di';

export async function getProductList(event) {
    const service = resolve(ProductService);
    const products = await service.getAll();

    return {
        statusCode: 200,
        body: JSON.stringify(products),
        headers: {},
        isBase64Encoded: false,
    };
}
