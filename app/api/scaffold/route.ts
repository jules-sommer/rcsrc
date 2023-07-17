import { NextRequest, NextResponse } from "next/server";
import clientPromise from "../../_lib/db";

export const GET = async (request: NextRequest, context) => {

    try {

        // grab mongo client and find our collection
        const client = await clientPromise;
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
            message: `/api/scaffold/ errored, probably no match`,
            data: err,
        }, { status: 404 });

    }

} 