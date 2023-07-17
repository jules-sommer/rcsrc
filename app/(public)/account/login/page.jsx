import { getServerSession } from 'next-auth';
import { Login, SignUp } from './_components/LoginPage';
import { providers, signIn, getSession, csrfToken } from 'next-auth/react';
import { authOptions } from '../../../api/auth/[...nextauth]/auth';
import { redirect } from 'next/navigation';

const LoginPage = async () => {

    const session = await getServerSession(authOptions)

    // if the user is not logged in, show the login page, otherwise redirect to the account page
    if (!session)
        return <Login />
    else
        redirect('/account', 'replace')

}

export default LoginPage;