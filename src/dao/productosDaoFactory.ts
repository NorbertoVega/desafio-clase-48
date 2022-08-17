import ProductosDaoMongoDB from './productos/ProductosDaoMongoDB.ts';

class ProductosDaoFactory {
    create() {
        return ProductosDaoMongoDB.getInstance();
    }
}

export default ProductosDaoFactory;