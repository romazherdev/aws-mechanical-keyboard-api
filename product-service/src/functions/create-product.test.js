import { buildHeaders } from '../helpers';

import { useDbConnection } from '../db';
import { ProductService } from '../services';
import { createProduct } from './create-product';

jest.mock('../db');
jest.mock('../services');

describe('createProduct', () => {
    const headers = buildHeaders();
    const generatedId = 'random-id-12345';

    beforeAll(() => {
        useDbConnection.mockImplementation((callback) => callback());
        ProductService.mockImplementation(() => ({
            async create(product, count) {
                return {
                    ...product,
                    count,
                    id: generatedId,
                };
            }
        }));
    });

    beforeEach(() => {
        ProductService.mockClear();
        useDbConnection.mockClear();
    });

    it('should create return the created entity', async () => {
        const body = {
            title: 'Product 1',
            description: 'Product description',
            price: 100,
            count: 10,
        };
        const event = { body: JSON.stringify(body) };

        const result = await createProduct(event);
        const expectedResult = { ...body, id: generatedId };

        expect(JSON.parse(result.body)).toEqual(expectedResult);
        expect(result.statusCode).toBe(200);
        expect(result.headers).toEqual(headers);
    });
});
