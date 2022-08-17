// deno-lint-ignore-file no-explicit-any
import CarritosRepo from '../repository/carrito.repository.ts';
import Cart from '../types/cart.type.ts';

const cartRepo = new CarritosRepo();

export async function guardarCarritoService(cartToSave: any) {
    return await cartRepo.save(cartToSave);
}

export async function borrarCarritoService(id: string) {
    return await cartRepo.deleteById(id);
}

export async function getCarritoByIdService(cartId: string) {
    return await cartRepo.getById(cartId);
}

export async function updateCarritoByIdService(cartId: string, cart: Cart) {
    return await cartRepo.updateById(cartId, cart);
}

export async function productoExisteEnCarritoService(cart: any, productId: string) {

    const filtered = await cart.productos.filter((p: any) => p._id.toString() == productId);

    if (filtered.length === 0)
        return false;

    return true;
}

export async function borrarProductoDelCarritoService(cart: any, cartId: string, productId: string) {
    cart.productos = cart.productos.filter((p: any) => p._id.toString() != productId);

    return await cartRepo.updateById(cartId, cart);
}

