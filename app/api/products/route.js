import { stdout } from "process";
import { getMongoClient } from "../../_utils/db";
import { NextResponse } from "next/server";

export const GET = async (request, context) => {
    
    const client = await getMongoClient(); 
    const products = client.db('data').collection('products');

    try {

        const filter = {};

        const limit = request.nextUrl.searchParams.get('limit') 
                        ? _.toSafeInteger(request.nextUrl.searchParams.get('limit')[0])
                        : 0;
    
        const query = products.find(filter, { limit: limit });

        const res = await query.toArray();

        return NextResponse.json({
            success: true,
            message: `/api/products/ found ${res.length} products`,
            data: res,
        }, { status: 200 });    

    } catch(err) {

        console.log(err);

        return NextResponse.json({
            success: false,
            message: `/api/products/ errored, either the DB connection failed or the query failed!`,
            data: err,
        }, { status: 400 });

    }

} 