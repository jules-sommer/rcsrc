import clientPromise from '../../../../../_lib/db'
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
            const options = product.orderingOptions;

            let optionArray = [];
            let clientObj = {};

            for(const option in options) {

                try {

                    console.log(`${option} is ${JSON.stringify(options[option])}`)

                    clientObj[_.toString(option)] = client.db('data').collection(_.toString(option));
                    const idArray = options[option].map((id) => new ObjectId(id));
                    const filter = {
                        '_id': { $in: idArray }
                    };

                    const thisQuery = clientObj[_.toString(option)].find(filter);
                    const thisRes = await thisQuery.toArray();

                    optionArray.push({
                        [option]: thisRes
                    });

                } catch(err) {
                    console.error(err);
                }

            }

            return NextResponse.json((optionArray), { status: 200 });

        }

    } catch(err) {

        console.log(err);
        
        return NextResponse.json({
            success: false,
            message: `/api/products/molSlug/${slug} errored`,
            data: err,
        }, { status: 400 });
    
    }

} 