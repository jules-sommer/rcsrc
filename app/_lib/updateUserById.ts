import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/auth";
import { ObjectIdType, User, UserSession } from '../_atoms/sessionInitialState';
import { Session } from "next-auth";
import clientPromise from "./db";
import { ObjectId } from "mongodb";

export const updateUserById = async ({ _id, user } : { _id: ObjectIdType, user: User }) => {

    const session: UserSession = await getServerSession(authOptions);

    if( session === null ) {
        return { success: false, message: 'You are not authorized to perform this operation.' };
    } else {
        
        // Support for both MongoDB style _id and Next-Auth.js style id

        console.log(session.user.id)
        console.log(_id)
        console.log(session.user._id)


        if(  session.user.id == undefined && toString(_id) !== toString(session.user.id) 
            || session.user._id == undefined && toString(_id) !== toString(session.user._id) ) {

                return { success: false, message: 'You are not authorized to perform this operation.' };

        }

    }

    const client = await clientPromise; 
    const users = client.db('next_auth').collection('users');

    if( !user )
        return { success: false, message: 'No user object was passed to the updateUserById function.' };

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
                                    '_id': new ObjectId(_id) // match the user by ID
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

        let findOneAndUpdateById = users.aggregate(pipeline);
        const result = await findOneAndUpdateById.toArray();

        let findOneUser = users.find({ _id: new ObjectId(_id) });
        const updatedUser = await findOneUser.toArray();

        return {
            success: true,
            message: `Successfully updated user ${_id}`,
            data: {
                id: _id,
                updatedUser: updatedUser.at(0),
                fields: user
            }
        }

    } catch(error) {

        console.log(error);

        return {
            success: false,
            message: `Failed to update user ${_id}`,
            data: {
                id: _id,
                fields: user,
                error: error,
            }
        }

    }

}