'use client'

import { useEffect } from "react";

/** ***********************************
 * AWS CONFIG STUFF -------------------
 * ***********************************/

import { ThemeProvider } from "@aws-amplify/ui-react";
import { Amplify } from 'aws-amplify';

import awsconfig from './aws-exports';

import { studioTheme } from "./ui-components";

Amplify.configure({ ...awsconfig, ssr: true });

import "@aws-amplify/ui-react/styles.css";
import { View } from '@aws-amplify/ui-react';
import { Authenticator } from "@aws-amplify/ui-react";

/** ***********************************
 * END AWS CONFIG STUFF ---------------
 * ***********************************/

const UseAwsAuth = ({ children }) => {

    useEffect(() => {

        

    }, []);

    return (

        <ThemeProvider theme={studioTheme}>
            <Authenticator.Provider>
                {children}
            </Authenticator.Provider>
        </ThemeProvider>

    );

}

export default UseAwsAuth;