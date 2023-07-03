import { Auth, withSSRContext } from 'aws-amplify';
import AuthenticatorWrapper from '../../_providers/AuthenticatorWrapper';
import { headers, cookies } from 'next/headers'
import awsExports from '../../aws-exports';
import { Amplify } from 'aws-amplify'
import _ from 'lodash';
import chalk from 'chalk'

Amplify.configure({ ...awsExports, ssr: true });

const DashboardLayout = async ({ children }) => {
    
    const headerCookie = headers().get('cookie');

    // Construct a req object & prepare an SSR enabled version of Amplify
    const req = {
        headers: {
            cookie: headerCookie,
        },
    };

    console.warn(req)

    try {

        const SSR = withSSRContext({ req })
        const user = await SSR.Auth.currentAuthenticatedUser()
        
        let newUserObj = {
            ...user.signInUserSession.idToken.payload,
            username: user.signInUserSession.idToken.payload["cognito:username"],
            isAuthenticated: true,
            //cartStore: JSON.parse(user.pool.storage.store.cartStore),
            storage: { ...user.pool.storage.store }
        }

        // Remove 'cognito:' from the keys using lodash _.mapKeys

        newUserObj = _.mapKeys(newUserObj, (value, key) => {
                            if (key.includes('cognito:')) {
                                return key.replace('cognito:', '');
                            } else {
                                return key;
                            }
                        });
    
        console.debug(JSON.stringify(newUserObj, undefined, 4))
                    
        return (

            <main>

                {children}
                
            </main>

        )

    } catch (error) {
        
        console.error(chalk.bgRedBright(error));

        return (

            <AuthenticatorWrapper/>

        )

    }

}

export default DashboardLayout