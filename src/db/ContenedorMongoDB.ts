// deno-lint-ignore-file no-explicit-any

import { ObjectId } from "https://deno.land/x/mongo@v0.30.1/deps.ts";

class ContenedorMongoDB {

    model: any;

    constructor(model: any) {
        this.model = model;
    }

    async save(objectToSave: any) {
        try {            
            const id = await this.model.insertOne(objectToSave);            
            return id.toString();
        }
        catch (error) {
            throw new Error(`Hubo un problema en save(): ${error.message}`)
        }
    }

    async getById(id: any) {
        try {            
            const response = await this.model.findOne({ _id : new ObjectId(id) });
            
            if (response !== null && response != undefined)
                return response;
            else
                return null;
        }
        catch {
            return null;
        }
    }

    async getAll() {
        try {
            const response = await this.model.find({}).toArray()    ;
            return response;
        }
        catch (error) {
            throw new Error(`Hubo un problema en getAll(): ${error.message}`)
        }
    }

    async deleteById(id: any) {
        try {
            const itemToEliminate = await this.getById(id);
            if (itemToEliminate !== null) {
                await this.model.deleteOne({ _id: new ObjectId(id) });
                return id;
            }
            else
                return null;
        }
        catch {
            return null;
        }
    }

    async deleteAll() {
        try {
            const all = await this.getAll();
            for (let i = 0; i < all.length; i++) {
                this.deleteById(all[i].id);
            }
        }
        catch (error) {
            throw new Error(`Hubo un problema en deleteAll(): ${error.message}`)
        }
    }

    async updateById(id: any, object: any) {
        try {
            const itemToUpdate = await this.getById(id);
            
            if (itemToUpdate !== null) {
                await this.model.updateOne({ _id: new ObjectId(id) }, {$set: object});
                return id;
            }
            else
                return null;
        }
        catch {
            return null;
        }
    }
}

export default ContenedorMongoDB;