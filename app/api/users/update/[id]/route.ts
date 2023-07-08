import clientPromise from '../../../../_lib/db'
import { NextRequest, NextResponse } from "next/server";
import { toSafeInteger } from "lodash";
import { ObjectId } from 'mongodb';
import type { User } from '../../../../_slices/_auth';
import chalk from 'chalk';
import { headers } from 'next/headers'
import { getServerSession } from "next-auth";
import { authOptions } from "../../../auth/[...nextauth]/auth";

/*
* UPDATE USER BY ID
********************************
* ROUTE: /api/users/update/[id]
********************************
* This route is for updating a user by id. It will take the id from the url slug and the updated user body from the request body.
* It will then update the user in the database with the new user body. Return some details about the update, and the new user object.
* This is used in the admin dashboard to update user details, and in Next-Auth.js to update user session in a callback from their
* function update().
*/ 
export const POST = async (

    req: NextRequest,
    res: NextResponse,
    { params } : { params: { id: string } }

) => {
    
    const { id } = params;
    const headerList = headers();

/* TO-DO: Make authentication for this API route work with Next-Auth.js. Currently, it is not working.

    try {

        const session = await getServerSession(req, res, authOptions);

        console.log(chalk.bgWhiteBright(JSON.stringify(session)));

        if(!session || session.user.id !== params.id || session.user.roles.some((thisRole) => thisRole === 'admin' )) {

            return NextResponse.json({
                error: 'You are not authorized to update this user.'
            }, { status: 401 });

        }

    } catch(error) {

        return NextResponse.json({
            error: 'An error occurred while authenticating your access to update this user.'
        }, { status: 401 });

    }
*/
    try {

        // wait for async post body to be parsed and typecheck it against user type
        const user: User = await req.json();

/* If we want the behavior of the POST to be that the posted user in body must match the id slug
*  in the url, then we can uncomment this code. Otherwise, we can just delete the _id field from
*  the body and let the update happen on the user with the id in the url slug.
        
        if( user._id !== id )
            throw new Error('ID mismatch on [id] and user in POST body. Updating failed...');

*/

        if( user._id )
            delete user._id;

        const client = await clientPromise; 
        const users = client.db('next_auth').collection('users');

        const pipeline = [
                        {
                            '$match': {
                                '_id': new ObjectId(id)
                            }
                        }, {
                            '$limit': 1
                        }, {
                            '$addFields': user
                        }, {
                        '$merge': { // aggregation will merge the results into the users collection based on the _id field and will fail if no id matches
                            'into': 'users', 
                            'on': [
                                '_id'
                            ], 
                            'whenMatched': 'merge', 
                            'whenNotMatched': 'fail'
                        }
                        }
                    ];

        let cursor = users.aggregate(pipeline);
        const result = await cursor.toArray();

        let cursorTwo = users.find({ _id: new ObjectId(id) });
        const updatedUser = await cursorTwo.toArray();

        return NextResponse.json({

            success: true,
            message: `Successfully updated user by ID: ${id}, with new user body: ${JSON.stringify(user)}`,
            data: { 
                id: id,
                req: req,
                fieldsAdded: user, 
                result: result,
                updatedUser: updatedUser
            },

        }, { status: 200 });    

    } catch(error) {

        console.log(error);

        return NextResponse.json({
            success: false,
            message: `An error occurred while updating ${id} with new user body: ${JSON.stringify(user)}`,
            data: error,
        }, { status: 400 });

    }

} 