import { buildHeaders } from '../helpers';
import { getProductList } from './get-product-list';

import { useDbConnection } from '../db';
import { ProductService } from '../services';

jest.mock('../db');
jest.mock('../services');

describe('getProductList', () => {
    const headers = buildHeaders();

    beforeAll(() => {
        useDbConnection.mockImplementation((callback) => callback());
        ProductService.mockImplementation(() => ({
            getAll() {
                return []
            }
        }));
    });

    beforeEach(() => {
        ProductService.mockClear();
        useDbConnection.mockClear();
    });

    it('should return mock data', async () => {
        const result = await getProductList({});

        expect(JSON.parse(result.body)).toEqual([]);
        expect(result.statusCode).toBe(200);
        expect(result.headers).toEqual(headers);
    });
});
