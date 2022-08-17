import { Context, helpers } from "../../deps.ts";

import {
    getAllProductsService,
    getProductoByIdService,
    saveProductService,
    updateProductByIdService,
    deleteProductByIdService
} from '../services/product.services.ts';
import Product from "../types/product.type.ts";

export async function getProductosController(ctx: Context) {
    try {
        ctx.response.status = 200;
        const allProducts = await getAllProductsService();
        ctx.response.body = { productos: allProducts };
    }
    catch (err) {
        ctx.response.status = 500;
        ctx.response.body = { code: 99, msg: err };
    }
}

export async function getProductoByIdController(ctx: Context) {
    try {
        const { id } = helpers.getQuery(ctx, { mergeParams: true });

        ctx.response.status = 200;

        const productById = await getProductoByIdService(id);
        if (productById === null) {
            ctx.response.status = 404;
            ctx.response.body = { code: -4, descripcion: 'Producto no encontrado.' };
            return;
        }
        ctx.response.body = { productById: productById };
    }
    catch (err) {
        ctx.response.status = 500;
        ctx.response.body = { code: '99', msg: err };
    }
}

export async function saveProductController(ctx: Context) {
    try {
        ctx.response.status = 201;

        const { codigo, descripcion, nombre, precio, stock, url } = await ctx.request.body().value;
        const product: Product = {
            codigo: codigo,
            descripcion: descripcion,
            nombre: nombre,
            precio: precio,
            stock: stock,
            timestamp: Date.now(),
            url: url
        }        
        const id = await saveProductService(product);        
        ctx.response.body = { idProductoGuardado: id };
    }
    catch (err) {
        ctx.response.status = 500;
        ctx.response.body = { code: '99', msg: err };
    }
}

export async function updateProductController(ctx: Context) {
    try {
        ctx.response.status = 202;

        const { id } = helpers.getQuery(ctx, { mergeParams: true });

        const { codigo, descripcion, nombre, precio, stock, url } = await ctx.request.body().value;
        const product: Product = {
            codigo: codigo,
            descripcion: descripcion,
            nombre: nombre,
            precio: precio,
            stock: stock,
            timestamp: Date.now(),
            url: url
        }
        const idUpdated = await updateProductByIdService(id, product);
        if (idUpdated !== null) {
            ctx.response.body = { idProductoActualizado: idUpdated };
            return;
        }
        ctx.response.status = 404;
        ctx.response.body = { error: -4, descripcion: 'Producto no encontrado. No se pudo actualizar.' };

    }
    catch (err) {
        ctx.response.status = 500;
        ctx.response.body = { code: '99', msg: err };
    }
}

export async function deleteProductController(ctx: Context) {
    try {
        const { id } = helpers.getQuery(ctx, { mergeParams: true });
     
        const idDeleted = await deleteProductByIdService(id);
        if (idDeleted === null) {
            ctx.response.status = 404;
            ctx.response.body = { error: -4, descripcion: 'Producto no encontrado. No se pudo eliminar.' };
            return;
        }
        ctx.response.body = { idProductoEliminado: idDeleted };
    }
    catch (err) {
        ctx.response.status = 500;
        ctx.response.body = { code: '99', msg: err };
    }
}
