import { MockProductService, ProductService, setupDIContainer } from '../core';
import { getProductList } from './get-product-list';

describe('getProductList', () => {
    let products = [
        {
            name: 'Keyboard 1',
            price: 10,
        },
        {
            name: 'Keyboard 2',
            price: 20,
        }
    ];

    beforeAll(() => {
        setupDIContainer([
            [ProductService, new MockProductService(products)]
        ]);
    });

    it('should return mock data', async () => {
        const result = await getProductList({});

        expect(JSON.parse(result.body)).toEqual(products);
        expect(result.statusCode).toBe(200);
    });
});
