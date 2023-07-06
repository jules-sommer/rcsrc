import clientPromise from '../../../../_lib/db'
import { NextResponse } from "next/server";
import { toSafeInteger } from "lodash";

export const GET = async (request, context) => {

    const client = await clientPromise; 
    const products = client.db('data').collection('products');

    try {

        const isFeatured = context.params.bool === 'true' ? true : false;
        const filter = {
            'isFeatured': isFeatured
        };

        const limit = request.nextUrl.searchParams.get('limit') 
                        ? toSafeInteger(request.nextUrl.searchParams.get('limit')[0])
                        : 0;
    
        const query = products.find(filter, { limit: limit });

        const res = await query.toArray();

        return NextResponse.json({
            success: true,
            message: `/api/products/isFeatured/${isFeatured} found ${res.length} products`,
            data: res,
        }, { status: 200 });    

    } catch(err) {

        console.log(err);

        return NextResponse.json({
            success: false,
            message: `/api/products/isFeatured/${isFeatured} errored, either the DB connection failed or the query failed!`,
            data: err,
        }, { status: 400 });

    }

} 