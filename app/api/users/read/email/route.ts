// query: { inStock: { $elemMatch: { $eq: true } } }

import { stdout } from "process";
import clientPromise from '../../../../_lib/db'
import { NextRequest, NextResponse } from "next/server";
import { toNumber } from "lodash";
import { NextPageContext } from "next";

export const POST = async (request: NextRequest, context) => {

    let { email } = await request.json();

    const client = await clientPromise;
    const products = client.db('next_auth').collection('users');

    let filter;

    if( email !== undefined ) {

        filter = {
            'email': email
        };

    } else {

        return NextResponse.json({
            success: false, 
            error: 'Email was not provided, cannot lookup user.'
        });

    }

    const query = products.find(filter, { limit: 1 });
    
    try {

        const res = await query.toArray();
    
        return NextResponse.json({
            success: true,
            message: `/api/users/read/email/${email} found ${res.length} user!`,
            data: res[0],
        }, { status: 200 });

    } catch(err) {

        console.log(err);

        return NextResponse.json({
            success: false,
            message: `/api/users/read/email/${email} DB call errored, see message.`,
            data: err,
        }, { status: 400 });

    }

} 