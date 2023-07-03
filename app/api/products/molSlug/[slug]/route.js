// query: { inStock: { $elemMatch: { $eq: true } } }

import { stdout } from "process";
import { getMongoClient } from "../../../../_utils/db"
import clientPromise from "../../../../_utils/db";
import { NextResponse } from "next/server";

export const GET = async (request, context) => {

    let slug = context.params.slug;

    const client = await clientPromise; 
    const products = client.db('data').collection('products');

    const filter = {
        'molSlug': slug
    };
    const limit = 1;

    const query = products.find(filter, { limit });
    
    try {

        const res = await query.toArray();

        return NextResponse.json({
            success: true,
            message: `/api/products/molSlug/${slug} found ${res.length} products`,
            data: res[0],
        }, { status: 200 });

    } catch(err) {

        console.log(err);
        
        return NextResponse.json({
            success: false,
            message: `/api/products/molSlug/${slug} errored`,
            data: err,
        }, { status: 400 });
    
    }

} 