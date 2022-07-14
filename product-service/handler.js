'use strict';

const products = [
  {
    productName: 'Keychron K2',
    price: 89,
  },
  {
    productName: 'Anne Pro 2',
    price: 69,
  }
];

module.exports.getProductsList = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(products, 2, null),
    isBase64Encoded: false,
    headers: {},
  };
};
