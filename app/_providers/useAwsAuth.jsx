'use client'

import { useEffect, useMemo } from "react";

/** ***********************************
 * AWS CONFIG STUFF -------------------
 * ***********************************/

import { ThemeProvider } from "@aws-amplify/ui-react";
import { Amplify } from '@aws-amplify/core';

import { studioTheme } from "../ui-components";
import awsExports from '../aws-exports';

Amplify.configure({ ...awsExports, ssr: true });

import "@aws-amplify/ui-react/styles.css";
import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react";
import { createContext } from "react";

/** ***********************************
 * END AWS CONFIG STUFF ---------------
 * ***********************************/

export const UserContext = createContext(null);
export const SignOutContext = createContext(null);

const UserContextWrapper = ({ children }) => {

    const { route, user, signOut } = useAuthenticator((context) => [context.user])

    let newUser = { isAuthenticated: false };

    useEffect(() => {
    
        if (route == 'authenticated') {

            newUser = {
                ...user.signInUserSession.idToken.payload,
                roles: user.signInUserSession.idToken.payload["cognito:groups"],
                ['cognito:groups']: _,
           //     cartStore: JSON.parse(user.pool.storage.store.cartStore),
                route: route,
                isAuthenticated: true
            };

        } else {

            newUser = {
                route: route,
                isAuthenticated: false
            };

        }

    }, [user, route]);

    return (

        <UserContext.Provider value={newUser}>
            <SignOutContext.Provider value={signOut}>
                {children}
            </SignOutContext.Provider>
        </UserContext.Provider>

    )

}

const UseAwsAuth = ({ children }) => {

    return (

        <ThemeProvider theme={studioTheme}>
            <Authenticator.Provider>
                <UserContextWrapper>
                    {children}
                </UserContextWrapper>
            </Authenticator.Provider>
        </ThemeProvider>

    );

}

export default UseAwsAuth;