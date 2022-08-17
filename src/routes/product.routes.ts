import { Router } from "../../deps.ts";
import {
    getProductosController,
    getProductoByIdController,
    saveProductController,
    updateProductController,
    deleteProductController,
} from "../handlers/product.handler.ts";

export const routerProduct = new Router()
  .get("/api/producto", getProductosController)
  .get("/api/producto/:id", getProductoByIdController)
  .post("/api/producto", saveProductController)
  .put("/api/producto/:id", updateProductController)
  .delete("/api/producto/:id", deleteProductController);