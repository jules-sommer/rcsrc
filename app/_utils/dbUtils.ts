import clientPromise from "../_lib/db";
import { z } from 'zod';
import { ObjectId } from 'mongodb';
import { slugify } from "./utils";

export const getProductByName = async (name: String) => {

    let slugged = slugify(name);

    const client = await clientPromise;
    const db = client.db('data').collection('products');

    console.log( slugged )

    const raw = db.findOne({ slug: slugged });
    let response = await raw;

    // serializing gets Mongo ObjectIds to strings, gross hack 
    response = JSON.parse(JSON.stringify(response));

    if( response )
        return {
            success: true,
            product: response
        }
    else
        return {
            success: false,
            product: null
        }

}

export const getProducts = async ({ limit = undefined } : { limit: number | undefined }) => {


    const client = await clientPromise;
    const db = client.db('data').collection('products');

    const raw = db.find({}, { limit: limit });
    const response = await raw.toArray();

    if( response.length > 0 )
        return {
            success: true,
            products: response
        }
    else
        return {
            success: false,
            products: null
        }

}