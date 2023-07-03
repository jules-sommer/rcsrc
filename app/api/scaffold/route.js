// query: { inStock: { $elemMatch: { $eq: true } } }

import { stdout } from "process";
import { getMongoClient } from "../../_utils/db";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export const GET = async (request, context) => {

    try {

        // grab mongo client and find our collection
        const client = await getMongoClient()
        const coll = client.db('data').collection('scaffolds');

        const filter = {};

        const query = coll.find(filter);
        const res = await query.toArray();
            
        if( res ) {

            return NextResponse.json({
                
                success: true,
                message: `/api/scaffold/ HIT a match!`,
                data: res,

            }, { status: 200 });

        }

    } catch (err) {

        console.log(`Error: ${err}, ( /api/scaffold/[id] )`);

        return NextResponse.json({
            success: false,
            message: `/api/scaffold/${id} errored, probably no match`,
            data: err,
        }, { status: 404 });

    }

} 