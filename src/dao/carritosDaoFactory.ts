import CarritosDaoMongoDB from './carritos/CarritosDaoMongoDB.ts';

class CarritosDaoFactory {
    create() {
        return CarritosDaoMongoDB.getInstance();
    }
}

export default CarritosDaoFactory;