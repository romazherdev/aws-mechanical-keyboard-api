import { MockProductService, ProductService, setupDIContainer } from '../core';
import { getProductById } from './get-product-by-id';

describe('getProductById', () => {
    let products = [
        {
            name: 'Keyboard 1',
            price: 10,
        },
    ];

    beforeAll(() => {
        setupDIContainer([
            [ProductService, new MockProductService(products)]
        ]);
    });

    it('should return specific product', async () => {
        const event = {
            pathParameters: {
                productId: 0,
            }
        };

        const result = await getProductById(event);

        expect(JSON.parse(result.body)).toEqual(products[0]);
        expect(result.statusCode).toBe(200);
    });

    it('should return 404 if product not found', async () => {
        const event = {
            pathParameters: {
                productId: 999,
            }
        };

        const result = await getProductById(event);

        expect(result.body).toBe('');
        expect(result.statusCode).toBe(404);
    });
});
