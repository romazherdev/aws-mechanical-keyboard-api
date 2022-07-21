import { buildHeaders } from '../helpers';
import { getProductById } from './get-product-by-id';

import { useDbConnection } from '../db';
import { ProductService } from '../services';

jest.mock('../db');
jest.mock('../services');

describe('getProductById', () => {
    const headers = buildHeaders();
    const products = [
        { id: '1', title: 'Product 1' },
        { id: '2', title: 'Product 2' }
    ];

    beforeAll(() => {
        useDbConnection.mockImplementation((callback) => callback());
        ProductService.mockImplementation(() => ({
            getOne(id) {
                return products.find(p => p.id === id);
            }
        }));
    });

    beforeEach(() => {
        ProductService.mockClear();
        useDbConnection.mockClear();
    });

    it('should return specific product', async () => {
        const event = {
            pathParameters: {
                productId: '1',
            }
        };

        const result = await getProductById(event);

        expect(JSON.parse(result.body)).toEqual(products[0]);
        expect(result.statusCode).toBe(200);
        expect(result.headers).toEqual(headers);
    });

    it('should return 404 if product not found', async () => {
        const event = {
            pathParameters: {
                productId: '999',
            }
        };

        const result = await getProductById(event);

        expect(result.body).toBe('');
        expect(result.statusCode).toBe(404);
        expect(result.headers).toEqual(headers);
    });
});
