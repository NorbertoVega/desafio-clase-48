// deno-lint-ignore-file no-explicit-any
import ContenedorMongoDB from '../../db/ContenedorMongoDB.ts';
import dbConn from '../../middlewares/mongo.conn.ts';
import Product from '../../types/product.type.ts';

let instance: any = null;
const productosModel = dbConn.collection<Product>('productos');

class ProductosDaoMongoDB extends ContenedorMongoDB {

    constructor() {
        super(productosModel);
    }

    static getInstance() {
        if (!instance) {
            instance = new ProductosDaoMongoDB();
        }

        return instance;
    }
}

export default ProductosDaoMongoDB;