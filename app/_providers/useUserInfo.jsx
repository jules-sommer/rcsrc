'use client'

import { useState, useMemo, useEffect } from 'react';
import { useAuthenticator } from '@aws-amplify/ui-react';
import { useRouter } from 'next/navigation';
import { mapKeys } from 'lodash';
import { Hub, Auth } from '@aws-amplify/core';

import { signUserOut, logUserIn } from '../_slices/_auth';
import { useDispatch, useSelector } from 'react-redux';

export const useUserInfo = () => {

    const { route, user, signOut } = useAuthenticator(context => [context.user, context.signOut, context.route])
    const authState = useSelector((state) => state.authReducer.value);

    const [authedUser, setAuthedUser] = useState({});

    const router = useRouter();
    const dispatch = useDispatch();

    const signUserOut = ( pathname = '/' ) => {

        try {

            signOut();
            dispatch(signUserOut());

        } catch (error) {

            console.log(error);

        }
            
        router.push(pathname);

    }

    useEffect(() => {

        console.log(`route: ${route} ( useUserInfo() )`);

        if (route == 'authenticated') {

            // clean up the user object and add some additional properties
            // including the cartStore object, and the 'isAuthenticated' property

            const newUserObj = {
                ...user.signInUserSession.idToken.payload,
                username: user.signInUserSession.idToken.payload["cognito:username"],
                currentStatus: route,
                //cartStore: JSON.parse(user.pool.storage.store.cartStore),
                storage: { ...user.pool.storage.store }
            }

            // Remove 'cognito:' from the keys using lodash _.mapKeys

            const lessCognitoUserObj = mapKeys(newUserObj, (value, key) => {
                                            if (key.includes('cognito:')) {
                                                return key.replace('cognito:', '');
                                            } else {
                                                return key;
                                            }
                                        });


            setAuthedUser({
                ...lessCognitoUserObj,
                isAuthenticated: true,
                loading: false,
                route: route
            });

        } else if (route == 'idle') {
        
            setAuthedUser({ isAuthenticated: undefined, loading: true, route: route })

        } else {

            setAuthedUser({ isAuthenticated: false, loading: false, route: route });

        }

    }, [user, route]);

    return [
        authedUser,
        route,
        signUserOut,
        authState
    ];

} 