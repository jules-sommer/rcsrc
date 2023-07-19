import clientPromise from '../../../../_lib/db'
import { NextRequest, NextResponse } from "next/server";
import { toSafeInteger } from "lodash";
import { ObjectId } from 'mongodb';
import type { User, UserSession } from '../../../../_atoms/sessionInitialState';
import { revalidatePath } from 'next/cache';
import chalk from 'chalk';
import { headers } from 'next/headers'
import { getServerSession } from "next-auth";
import { authOptions } from "../../../auth/[...nextauth]/auth";
import { NextApiRequest } from 'next';

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

const userHandler = async (
    request: NextRequest,
    { params }: { params: { id: string } }
) => {

    const id = params.id;
    const session: UserSession = await getServerSession(authOptions);

    /*
    *   NOTE: The following code compared the user ID trying to perform the action with the user ID in the session.
    *   This is a security measure to prevent users from updating other users' profiles. It also checks to make sure
    *   that the user is authenticated at all.
    */

    const UNAUTHENTICATED = NextResponse.json({ error: '401: You are not authorized to perform this operation.' }, { status: 401 });

    if( session === null || params.id !== session.user.id ) {
        return UNAUTHENTICATED;
    } else {
        
        // Support for both MongoDB style _id and Next-Auth.js style id

        if(  typeof session.user.id == 'string' && params.id !== session.user.id ) {
            return UNAUTHENTICATED;
        } else if( typeof session.user._id == 'string' && params.id !== session.user._id ) {
            return UNAUTHENTICATED;
        }

    }

    /*
    * NOW that we're done authenticating the user, we can get onto business logic for the route.
    */

    // get the client connection to the database

    const client = await clientPromise; 
    const users = client.db('next_auth').collection('users');

    if( request.method == 'POST' ) {

        // get new user object for a POST request to update a user by ID
        const user = await request.json();

        if( !user )
            return NextResponse.json({ error: '400: Bad request, no user object was passed in the request body.' }, { status: 400 });

        // sanitize the user object from an ID so that we don't accidentally update the ID of this user and cause an error

        if( user.id )
            delete user.id;
        else if ( user._id )
            delete user._id



        try {

            // pipeline to find and update the user by ID
            const pipeline = [
                                {
                                    '$match': {
                                        '_id': new ObjectId(id) // match the user by ID
                                    }
                                }, {
                                    '$limit': 1     // limit the results to 1, since we're only updating one user
                                }, {
                                    '$addFields': user   // add the fields from the user object to the user in the database
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

    } else if ( request.method == 'GET' ) {

        let findUserById = users.find({ _id: new ObjectId(id) });
        const user = await findUserById.toArray();

        return NextResponse.json({ id: id, params: params, session: session, user: user }, { status: 200 });

    }

}

export { userHandler as POST, userHandler as GET }