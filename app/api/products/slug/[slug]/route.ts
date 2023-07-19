// query: { inStock: { $elemMatch: { $eq: true } } }

import { stdout } from "process";
import clientPromise from '../../../../_lib/db'
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest, context) => {

    let { slug } = context.params;

    console.log(slug);

    const client = await clientPromise; 
    const products = client.db('data').collection('products');

    const filter = {
        'slug': slug
    };

    const query = products.findOne(filter);
    
    try {

        const res = await query;

        console.log(res)

        return NextResponse.json({
            success: true,
            message: `/api/products/molSlug/${slug} found product`,
            product: res,
        }, { status: 200 });

    } catch(err) {

        console.log(err);
        
        return NextResponse.json({
            success: false,
            message: `/api/products/molSlug/${slug} errored`,
            product: err,
        }, { status: 400 });
    
    }

} 