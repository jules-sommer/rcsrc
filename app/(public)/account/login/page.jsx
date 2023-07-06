import { Login, SignUp } from '../Login';
import { providers, signIn, getSession, csrfToken } from 'next-auth/react';

const LoginPage = async ({ req, res }) => {

    console.log( `request ${JSON.stringify(req, undefined, 4)}` );

    return (

        <Login />

    );    

}

export default LoginPage;