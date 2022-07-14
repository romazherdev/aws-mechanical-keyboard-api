import { MockProductService, ProductService, setupDIContainer } from './src/core';
import { getProductList, getProductById } from './src/functions'
import { MOCK_PRODUCTS } from './src/mocks';

setupDIContainer([
    [ProductService, new MockProductService(MOCK_PRODUCTS)],
]);

export {
    getProductList,
    getProductById,
};
