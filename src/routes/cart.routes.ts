import { Router } from "../../deps.ts";
import {
    crearCarritoController,
    borrarCarritoController,
    agregarProductoACarritoController,
    obtenerProductosCarritoController,
    borrarProductoDelCarritoController,
} from "../handlers/cart.handler.ts";

export const routerCart = new Router()
  .post("/api/carrito", crearCarritoController)
  .delete("/api/carrito/:id", borrarCarritoController)
  .post("/api/carrito/:cartId/productos/:productId", agregarProductoACarritoController)
  .get("/api/carrito/:cartId", obtenerProductosCarritoController)
  .delete("/api/carrito/:cartId/productos/:productId", borrarProductoDelCarritoController);