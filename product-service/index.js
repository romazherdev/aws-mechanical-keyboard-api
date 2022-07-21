import { setupDIContainer } from './src/core';
import { getProductList, getProductById } from './src/functions'
import { MockProductService, ProductService } from './src/functions/services';
import { MOCK_PRODUCTS } from './src/mocks';

setupDIContainer([
    [ProductService, new MockProductService(MOCK_PRODUCTS)],
]);

export {
    getProductList,
    getProductById,
};
