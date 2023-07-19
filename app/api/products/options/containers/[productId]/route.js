import clientPromise from "../../../../../_lib/db";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import _ from 'lodash';
import sanitize from 'mongo-sanitize';

export const GET = async (request, context) => {

    let productId = sanitize(context.params.productId);

    const client = await clientPromise; 
    const products = client.db('data').collection('products');

    const filter = {
        '_id': new ObjectId(productId)
    };
    const limit = 1;

    const query = products.find(filter, { limit });
    
    try {

        const res = await query.toArray();

        if( res.length === 1 ) {

            const product = res[0];
            const containers = product.orderingOptions.containers;

            if( containers ) {

                try {

                    let client = await clientPromise;
                    let containersCollection = client.db('data').collection('containers');

                    const idArray = containers.map((id) => new ObjectId(id));

                    const filter = {
                        '_id': { $in: idArray }
                    }

                    const raw = containersCollection.find(filter).toArray()
                    const [ ...result ] = await raw;

                    console.debug(result)

                    return NextResponse.json(result, { status: 200 });

                } catch(err) {

                    console.error(err);

                    return NextResponse.json({
                        success: false,
                        message: `/api/products/options/concentrations/${productId} errored`,
                        data: err,
                    }, { status: 400 });

                }

            } else {

                return NextResponse.json({
                    success: false,
                    message: `/api/products/options/concentrations/${productId} errored`,
                    data: 'concentrations array was empty for this product',
                }, { status: 400 });



            }

        }

    } catch(err) {

        console.error(err);

        return NextResponse.json({
            success: false,
            message: `/api/products/options/concentrations/${productId} errored`,
            data: err,
        }, { status: 400 });

    }

} 