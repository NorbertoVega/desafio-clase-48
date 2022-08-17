import Product from "./product.type.ts";

interface Cart {
    productos: Array<Product>, 
    timestamp: number
}

export default Cart;