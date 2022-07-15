import { setupDIContainer } from '../core';
import { MockProductService, ProductService } from './services';
import { buildHeaders } from '../helpers';
import { getProductList } from './get-product-list';

describe('getProductList', () => {
    const headers = buildHeaders();
    let products = [
        {
            title: 'Keyboard 1',
            price: 10,
        },
        {
            title: 'Keyboard 2',
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
        expect(result.headers).toEqual(headers);
    });
});
