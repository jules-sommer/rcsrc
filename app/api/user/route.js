import { NextResponse, NextRequest } from "next/server"
import { headers } from 'next/headers'
import { Amplify, Auth, withSSRContext } from "aws-amplify";
import _, { omit } from 'lodash';
import chalk from 'chalk'

import { createEdgeRouter } from "next-connect";

const router = createEdgeRouter();

router
    .use(async (req, event, next) => {

        const start = Date.now();
        await next(); // call next in chain
        const end = Date.now();
        
        console.log(`Request took ${end - start}ms`);
    
    })
    .post(async (req, event, next) => {

        console.log(JSON.stringify(req, null, 2));

        console.log(chalk.blue('POST /api/user'));

        const { username, password, email } = body;

        console.log(chalk.blue('POST /api/user: username: ', username));
        console.log(chalk.blue('POST /api/user: password: ', password));
        console.log(chalk.blue('POST /api/user: email: ', email));

        try {

            const user = await API.Auth.signUp({
                username,
                password,
                attributes: {
                    email
                }
            });

            console.log(chalk.blue('POST /api/user: user: ', user));
            return NextResponse.redirect('/api/user/confirm');

        } catch (error) {

            console.log(chalk.red('POST /api/user: error: ', error));
            return NextResponse.redirect('/api/user/error');

        }
    })

export const POST = async ( request, context ) => {
    router.run(request, context);
}