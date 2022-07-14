/**
 * @abstract
 */
export class ProductService {
    async getAll() {
        throwError();
    }
    async getOne(id) {
        throwError();
    }
}

function throwError() {
    throw new Error('Must be implemented by subclass');
};
