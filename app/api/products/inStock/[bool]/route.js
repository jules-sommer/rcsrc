// query: { inStock: { $elemMatch: { $eq: true } } }

import { stdout } from "process";
import clientPromise from "../../../../_utils/db"
import { NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const queries = async () => {

    const products = await prisma.product.findMany({
        where: {
            inStock: {
                value: {
                    $gt: 0
                }
            }
        }
    })

    console.log(products);
    return products;

}

export const GET = async (request, context) => {

    let contextParams = context.params.bool;

    const users = queries()
        .then(async () => {
            await prisma.$disconnect()
        })
        .catch(async (e) => {
            console.error(e)
            await prisma.$disconnect()
            process.exit(1)
        })

    try {

        const client = await clientPromise;
        const products = client.db('data').collection('products');

    } catch(err) {

        console.log(err);

    }

    const filter = {
        'inStock': {
            '$elemMatch': {
                '$eq': true
            }
        }
    };

    const query = products.find(filter);
    
    try {

        const res = await query.toArray();
        stdout.write(`/api/products/inStock/${contextParams} returned ${query}\n`);
    
        return NextResponse.json({
            success: true,
            message: `/api/products/inStock/${contextParams} found ${res.length} products`,
            data: res,
        }, { status: 200 });

    } catch(err) {
        console.log(err);
        return NextResponse.json({
            success: false,
            message: `/api/products/inStock/${contextParams} errored`,
            data: err,
        }, { status: 400 });
    }


} 