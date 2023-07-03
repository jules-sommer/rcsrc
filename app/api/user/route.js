import { NextResponse, NextRequest } from "next/server"
import { headers } from 'next/headers'
import { Amplify, Auth, withSSRContext } from "aws-amplify";
import _, { omit } from 'lodash';
import chalk from 'chalk'

import awsExports from '../../aws-exports';

Amplify.configure({ ...awsExports, ssr: true });

import { createEdgeRouter } from "next-connect";

const router = createEdgeRouter();

router
    .use(async (req, event, next) => {

        const start = Date.now();

        await next(); // call next in chain

        const end = Date.now();
        
        console.log(`Request took ${end - start}ms`);
    
    })
    
    .get(async (req, event, next) => {

    })

export const GET = async ( request, context ) => {

    router.run(request, context);

}