import { Login, SignUp } from '../Login';
import { providers, signIn, getSession, csrfToken } from 'next-auth/react';

const LoginPage = () => {

    return (

        <Login />

    );    

}

export default LoginPage;