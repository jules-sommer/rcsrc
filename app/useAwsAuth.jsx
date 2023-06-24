'use client'

import { useEffect } from "react";

/** ***********************************
 * AWS CONFIG STUFF -------------------
 * ***********************************/

import { ThemeProvider } from "@aws-amplify/ui-react";
import { Amplify } from 'aws-amplify';

import { studioTheme } from "./ui-components";
import awsExports from './aws-exports';

Amplify.configure({ ...awsExports, ssr: true });

import "@aws-amplify/ui-react/styles.css";
import { Authenticator } from "@aws-amplify/ui-react";

/** ***********************************
 * END AWS CONFIG STUFF ---------------
 * ***********************************/

const UseAwsAuth = ({ children }) => {

    return (

        <ThemeProvider theme={studioTheme}>
            <Authenticator.Provider>
                {children}
            </Authenticator.Provider>
        </ThemeProvider>

    );

}

export default UseAwsAuth;