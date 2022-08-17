// deno-lint-ignore-file no-explicit-any
import ContenedorMongoDB from '../../db/ContenedorMongoDB.ts';
import dbConn from "../../middlewares/mongo.conn.ts";
import Cart from '../../types/cart.type.ts';

let instance: any = null;
const carritosModel = dbConn.collection<Cart>('carritos');

class CarritosDaoMongoDB extends ContenedorMongoDB {

    constructor() {
        super(carritosModel);
    }

    static getInstance() {
        if (!instance) {
            instance = new CarritosDaoMongoDB();
        }

        return instance;
    }
}

export default CarritosDaoMongoDB;