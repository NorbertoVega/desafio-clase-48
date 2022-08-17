import CarritosDaoMongoDB from "../dao/carritos/CarritosDaoMongoDB.ts";
import CarritosDaoFactory from "../dao/carritosDaoFactory.ts";
import Cart from "../types/cart.type.ts";

class CarritosRepo {
    
    cartDao: CarritosDaoMongoDB;

    constructor() {
        this.cartDao = new CarritosDaoFactory().create();
    }

    async save(cartToSave: any) {
        return await this.cartDao.save(cartToSave);
    }

    async getById(id: string) {
        return await this.cartDao.getById(id);
    }

    async getAll() {
        return await this.cartDao.getAll();
    }

    async deleteById(id: string) {
        return await this.cartDao.deleteById(id);
    }

    async deleteAll() {
        return await this.cartDao.deleteAll();
    }

    async updateById(id: string, cart: Cart) {
        return await this.cartDao.updateById(id, cart);
    }
}

export default CarritosRepo;