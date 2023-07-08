'use client'

import { useRouter } from 'next/navigation';
import { mapKeys } from 'lodash';

import { useSelector } from 'react-redux';
import { signIn, signOut } from "next-auth/react";
import { useSession, getSession } from "next-auth/react"
import { useEffect, useState } from 'react';

import type { User } from '../_slices/_auth';
import { 
    logUserIn,
    setLatestAuthEvent,
    initialState,
    signUserOut
} from '../_slices/_auth';
import { store } from '../_store/store';

/*
*   This hook is used to manage the user's authentication state.
*   It is used to update the user's authentication state when the user logs in or out.
*   by plugging into the next-auth session object, checking if our redux store is in sync with the session object,
*   and updating the redux store accordingly. We then return the auth state and actions to the component that called it.
*
*   It is used in the following components:
*   - app\(public)\account\LoginForm.tsx
*   - app\(public)\account\profile\EditProfile.tsx
*/

export const useUserInfo = () => {

    const auth = useSelector((state) => state.authReducer.value);
    const { data: session, status, update } = useSession();

    const router = useRouter();

    useEffect(() => {

        console.log(`Session: ${JSON.stringify(session)}`)
        console.log(`Status: ${JSON.stringify(status)}`)

        if( session ) {

            if(auth === initialState.value && status === 'authenticated') {

                console.log(`Auth state is initial state.`)

                const user: User = {
                    id: session.user.id ? session.user.id : '',
                    email: session.user.email ? session.user.email : '',
                    name: session.user.name ? session.user.name : '',
                    roles: session.user.roles ? session.user.roles : [],
                    isAuthorized: status
                }

                store.dispatch(logUserIn(user));
                store.dispatch(setLatestAuthEvent({
                    type: 'login',
                    date: new Date().toISOString(),
                    value: user,
                }));

            } else if( status === 'unauthenticated' ) {

                store.dispatch(signUserOut);
                store.dispatch(setLatestAuthEvent({
                    type: 'signOut',
                    date: new Date().toISOString(),
                    value: store,
                }));

            }

        }

    }, [session, status]);

    const killCurrentSession = () => {

        try {

            signOut(); // Next-auth provided signOut() function
            store.dispatch(signUserOut); // Clear the store
            store.dispatch(setLatestAuthEvent({ // Set an auth event so we know what this fucker has been up to
                type: 'signOut',
                date: new Date().toISOString(),
                value: store,
            }));

        } catch (error) {

            console.log(error);

        }
            
    }

    return {
        auth: {
            auth,
            session,
            status,
        },
        actions: {
            update,
            killCurrentSession
        }
    };

} 