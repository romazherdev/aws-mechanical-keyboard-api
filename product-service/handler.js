'use strict';

const products = [
  {
    id: 0,
    productName: 'Keychron K2',
    price: 89,
  },
  {
    id: 1,
    productName: 'Anne Pro 2',
    price: 69,
  }
];

module.exports.getProductList = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(products, 2, null),
    isBase64Encoded: false,
    headers: {},
  };
};


module.exports.getProductById = async (event) => {
  const { productId } = event.pathParameters;
  const product = products[productId];

  if (!product) {
    return {
      statusCode: 404,
      body: null,
      isBase64Encoded: false,
      headers: {},
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify(product, 2, null),
    isBase64Encoded: false,
    headers: {},
  };
};