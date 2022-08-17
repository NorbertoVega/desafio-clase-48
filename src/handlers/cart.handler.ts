import { Context, helpers } from "../../deps.ts";
import { getProductoByIdService } from '../services/product.services.ts';
import {
    guardarCarritoService,
    borrarCarritoService,
    getCarritoByIdService,
    updateCarritoByIdService,
    productoExisteEnCarritoService,
    borrarProductoDelCarritoService } from '../services/cart.service.ts';
import Cart from "../types/cart.type.ts";

export async function crearCarritoController(ctx: Context) {
    try {
        ctx.response.status = 201;

        const cartToSave: Cart = { 
            timestamp: Date.now(), 
            productos: [] }
        const id = await guardarCarritoService(cartToSave);
        ctx.response.body = { idCarritoGuardado: id };
    }
    catch (err) {
        ctx.response.status = 500;
        ctx.response.body = { code: 99, msg: err };
    }
}

export async function borrarCarritoController(ctx: Context) {
    try {
        ctx.response.status = 201;
        const { id } = helpers.getQuery(ctx, { mergeParams: true });

        const idDeleted = await borrarCarritoService(id);
        if (idDeleted === null) {
            ctx.response.status = 404;
            ctx.response.body = { error: -4, descripcion: 'Carrito no encontrado. No se pudo eliminar.' };
            return;
        }
        ctx.response.body = { idCarritoEliminado: idDeleted };
    }
    catch (err) {
        ctx.response.status = 500;
        ctx.response.body = { code: 99, msg: err };
    }
}

export async function agregarProductoACarritoController(ctx: Context) {
    try {
        ctx.response.status = 201;
        const { cartId, productId } = helpers.getQuery(ctx, { mergeParams: true });

        const productById = await getProductoByIdService(productId);
        if (productById === null) {
            ctx.response.status = 404;
            ctx.response.body = { error: -4, descripcion: 'No se pudo agregar al carrito. Producto no encontrado.' };
            return;
        }

        const cartById = await getCarritoByIdService(cartId);
        if (cartById === null) {
            ctx.response.status = 404;
            ctx.response.body = { error: -4, descripcion: 'No se pudo agregar al carrito. Carrito no encontrado.' };
            return;
        }
        cartById.productos.push(productById);

        const idUpdated = await updateCarritoByIdService(cartId, cartById);
        if (idUpdated == null) {
            ctx.response.status = 400;
            ctx.response.body = { error: -5, descripcion: 'No se pudo agregar al carrito. Hubo un problema al actualizar el carrito.' };
            return;
        }
        ctx.response.body = { idCarritoActualizado: idUpdated };
    }
    catch (err) {
        ctx.response.status = 500;
        ctx.response.body = { code: 99, msg: err };
    }
}

export async function obtenerProductosCarritoController(ctx: Context) {
    try {
        ctx.response.status = 200;
        const { cartId } = helpers.getQuery(ctx, { mergeParams: true });

        const cartById = await getCarritoByIdService(cartId);
        if (cartById === null) {
            ctx.response.status = 404;
            ctx.response.body = { error: -4, descripcion: 'No se pudieron obtener los productos. Carrito no encontrado.' };
            return;
        }
        ctx.response.body = { productos: cartById.productos };
    }
    catch (err) {
        ctx.response.status = 500;
        ctx.response.body = { code: 99, msg: err };
    }
}

export async function borrarProductoDelCarritoController(ctx: Context) {
    try {
        ctx.response.status = 201;
        const { cartId, productId } = helpers.getQuery(ctx, { mergeParams: true });

        const cartById = await getCarritoByIdService(cartId);
        if (cartById === null) {
            ctx.response.status = 404;
            ctx.response.body = { error: -4, descripcion: 'No se pudo eliminar del carrito. Carrito no encontrado.' };
            return;
        }

        if (!productoExisteEnCarritoService(cartById, productId)) {
            ctx.response.status = 404;
            ctx.response.body = { error: -4, descripcion: 'No se pudo eliminar del carrito. Producto no encontrado.' };
            return;
        }

        const idUpdated = await borrarProductoDelCarritoService(cartById, cartId, productId);
        if (idUpdated == null) {
            ctx.response.status = 400;
            ctx.response.body = { error: -5, descripcion: 'No se pudo eliminar del carrito. Hubo un problema al actualizar el carrito.' };
            return;
        }
        ctx.response.body = { idCarritoActualizado: idUpdated };
    }
    catch (err) {
        ctx.response.status = 500;
        ctx.response.body = { code: 99, msg: err };
    }
}
