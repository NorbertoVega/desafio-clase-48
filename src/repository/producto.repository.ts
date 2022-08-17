import ProductosDaoMongoDB from "../dao/productos/ProductosDaoMongoDB.ts";
import ProductosDaoFactory from "../dao/productosDaoFactory.ts";
import Product from "../types/product.type.ts";

class ProductosRepo {
    
    productDao: ProductosDaoMongoDB;

    constructor() {
        this.productDao = new ProductosDaoFactory().create();
    }

    async save(productToSave: Product) {
        return await this.productDao.save(productToSave);
    }

    async getById(id: string) {
        return await this.productDao.getById(id);
    }

    async getAll() {
        return await this.productDao.getAll();
    }

    async deleteById(id: string) {
        return await this.productDao.deleteById(id);
    }

    async deleteAll() {
        return await this.productDao.deleteAll();
    }

    async updateById(id: string, productToUpdate: Product) {
        return await this.productDao.updateById(id, productToUpdate);
    }
}

export default ProductosRepo;