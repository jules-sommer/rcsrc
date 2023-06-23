// query: { inStock: { $elemMatch: { $eq: true } } }

import { stdout } from "process";
import { getMongoClient } from "../../../../@utils/db"
import { NextResponse } from "next/server";

export const GET = async (request, context) => {

    let contextParams = context.params.slug;

    const db = await getMongoClient(); 
    const products = db.db('data').collection('products');

    const filter = {
        'molSlug': {
            '$eq': contextParams
        }
    };

    const query = products.find(filter);
    
    try {

        const res = await query.toArray();
        stdout.write(`/api/products/molSlug/${contextParams} returned ${query}\n`);
    
        return NextResponse.json({
            success: true,
            message: `/api/products/molSlug/${contextParams} found ${res.length} products`,
            data: res,
        }, { status: 200 });

    } catch {(err) => {
        console.log(err);
        return NextResponse.json({
            success: false,
            message: `/api/products/molSlug/${contextParams} errored`,
            data: err,
        }, { status: 400 });
    }}


} 