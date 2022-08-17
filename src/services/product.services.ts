import ProductosRepo from "../repository/producto.repository.ts";
import Product from "../types/product.type.ts";

const productRepo = new ProductosRepo();

export async function getAllProductsService() {
    return await productRepo.getAll();
}

export async function getProductoByIdService(id: string) {
    return await productRepo.getById(id);
}

export async function saveProductService(productToSave: Product) {    
    return await productRepo.save(productToSave);
}

export async function updateProductByIdService(id: string, productToUpdate: Product) {
    return await productRepo.updateById(id, productToUpdate);
}

export async function deleteProductByIdService(id: string) {
    return await productRepo.deleteById(id);
}