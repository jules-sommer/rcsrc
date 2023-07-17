import { AccountControls } from './profile/_components/AccountControls';
import { headers, cookies } from 'next/headers'
import _ from 'lodash'
import chalk from 'chalk'
import UserAccountSummary from './UserAccountSummary'
import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../api/auth/[...nextauth]/auth';
import { EditProfile } from './profile/ProfileMain'
import Image from 'next/image'
import { slugify } from '../../_utils/utils'
import { Suspense } from 'react'
import type { Session } from 'next-auth'
import { updateUserById } from '../../_lib/updateUserById'
import { UserSession } from '../../_atoms/sessionInitialState';
import { revalidatePath } from 'next/cache'

const updateUser = async (data: UserSession) => {
    'use server'

    console.log(data);

    const { user } = data;
    const { id } = user;

    const raw = await updateUserById({ _id: id, user: user });

    const { success, message, data: result } = raw;

    revalidatePath('/account');

    return { 
        success,
        message,
        result
    };

}

const Account = async (request, context) => {

    const session = await getServerSession(authOptions) as UserSession;

    if (session) {

        let hasName = session.user.name ? true : false;
        let hasRoles = session.user.roles ? true : false;
        let hasCompany = session.user.company ? true : false;
        let hasEmail = session.user.email ? true : false;
        
        return (

            <div className='w-9/12 mx-auto py-12 grid gap-8 grid-cols-6 auto-rows-min'>

                <div className={`
                    flex flex-col col-span-2 h-min items-center px-8 py-8 max-w-xs
                    bg-gradient-to-br from-indigo-900/50 via-cyan-900/50 to-blue-900/50
                    border-2 border-cyan-800 rounded-3xl`}>

                    <Image
                        src={`https://api.dicebear.com/6.x/bottts/png?seed=${slugify(session.user.email.split('@')[0])}}`}
                        width={100}
                        alt='User Avatar'
                        height={100}
                        className='rounded-full mask mask-hexagon bg-accent my-6'
                    />

                    <div className='text-sky-100 flex flex-col items-center justify-center text-center prose'>
                        {hasName ? (<h1 className='font-bold mb-6 my-5'>{session.user.name}</h1>) : null}
                        {hasCompany ? (<h3 className='font-semibold my-0'>{session.user.company}</h3>) : null}
                        {hasEmail ? (<h3 className='my-0 font-light'>{session.user.email}</h3>) : null}
                    </div>

                    {hasRoles ? (

                        <div className="mt-8">

                            {session.user.roles.map((thisRole) => (

                                <div className="badge badge-accent badge-lg font-mono text-white border-2 px-3 py-3 first-of-type:ml-0 ml-3">{thisRole}</div>

                            ))}

                        </div>
                        
                    ) : null}
                    

                    <div className='account-controls w-full'>
                        <AccountControls serverSession={session} />
                    </div>

                </div>

                <div className={`
                    flex flex-col col-span-4 flex-grow`}>

                    <Suspense fallback={<div className="w-full h-full"></div>}>
                        <EditProfile serverSession={session} updateUser={updateUser} />
                    </Suspense>

                </div>

            </div>

        );

    } else {

        redirect('/account/login');

    }

}

export default Account;