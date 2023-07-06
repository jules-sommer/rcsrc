import { headers, cookies } from 'next/headers'
import _ from 'lodash'
import chalk from 'chalk'
import UserAccountSummary from './UserAccountSummary'
import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../api/auth/[...nextauth]/auth';

const Account = async (request, context) => {

    const session = await getServerSession(authOptions);

    if (session) {

        let hasName;
        let hasRoles;

        if (session.user.name)
            hasName = true;
        else
            hasName = false;

        if (session.user.roles)
            hasRoles = true;
        else
            hasRoles = false;
        
        return (

            <div>

                <h1 className='text-lg font-mono text-white'>Welcome to your account, {hasName ? session.user.name : session.user.email}</h1>
                <pre>{JSON.stringify(session, undefined, 4)}</pre>
            
            </div>

        );

    } else {

        redirect('/account/login');

    }

}

export default Account;