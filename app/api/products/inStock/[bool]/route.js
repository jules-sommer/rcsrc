// query: { inStock: { $elemMatch: { $eq: true } } }

import { stdout } from "process";
import clientPromise from "../../../../_utils/db"
import { NextResponse } from "next/server";
import { toNumber } from "lodash";

export const GET = async (request, context) => {

    let isInStock = context.params.bool === 'true' ? true : false;

    const client = await clientPromise;
    const products = client.db('data').collection('products');

    let filter;

    if( isInStock === true ) {

        filter = {
            'inStock.value': {
                '$gt': 0
            }
        };

    } else if( isInStock === false ) {

        filter = {
            'inStock.value': {
                '$eq': 0
            }
        };

    }

    const query = products.find(filter);
    
    try {

        const res = await query.toArray();
        stdout.write(`/api/products/inStock/${isInStock} returned ${JSON.stringify(res)}\n`);
    
        return NextResponse.json({
            success: true,
            message: `/api/products/inStock/${isInStock} found ${res.length} products`,
            data: res,
        }, { status: 200 });

    } catch(err) {

        console.log(err);

        return NextResponse.json({
            success: false,
            message: `/api/products/inStock/${isInStock} errored`,
            data: err,
        }, { status: 400 });

    }


} 