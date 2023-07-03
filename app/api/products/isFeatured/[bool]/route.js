// query: { inStock: { $elemMatch: { $eq: true } } }

import { stdout } from "process";
import { getMongoClient } from "../../../../_utils/db"
import { NextResponse } from "next/server";
import _ from "lodash";

export const GET = async (request, context) => {

    let isFeatured = context.params.bool;

    isFeatured === 'true' ? isFeatured = true : isFeatured = false;

    if( !_.isBoolean(isFeatured) ) {

        console.log(`error: ${isFeatured} is not a boolean\n`);
        return NextResponse.json({
            success: false,
            message: `/api/products/isFeatured/${isFeatured} takes a boolean value as final url parameter i.e /api/products/isFeatured/true or /api/products/isFeatured/false?limit=4`,
            data: `isFeatured: ${isFeatured} is not a boolean`,
        }, { status: 400 });

    }

    const db = await getMongoClient(); 
    const products = db.db('data').collection('products');

    const filter = {
        'isFeatured': isFeatured
    };

    const limit = request.nextUrl.searchParams.get('limit') 
                    ? _.toSafeInteger(request.nextUrl.searchParams.get('limit')[0])
                    : 0;

    console.log(filter);
    console.log(limit);

    const query = products.find(filter, { limit: limit });
    
    try {

        const res = await query.toArray();
        console.log(`/api/products/isFeatured/${isFeatured} returned ${res}\n`);
    
        return NextResponse.json({
            success: true,
            message: `/api/products/isFeatured/${isFeatured} found ${res.length} products`,
            data: res,
        }, { status: 200 });

    } catch(err) {

        console.log(err);
        return NextResponse.json({
            success: false,
            message: `/api/products/isFeatured/${isFeatured} errored`,
            data: err,
        }, { status: 400 });

    }

} 