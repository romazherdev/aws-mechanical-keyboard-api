import { ProductService } from './product.service';

export class MockProductService extends ProductService {
    constructor(products) {
        super();
        this.products = products;
    }

    async getAll() {
        return this.products;
    }

    async getOne(id) {
        return this.products[id];
    }
}
