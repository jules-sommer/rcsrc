import { AccountControls } from './profile/_components/AccountControls';
import { headers, cookies } from 'next/headers'
import _ from 'lodash'
import chalk from 'chalk'
import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../api/auth/[...nextauth]/auth';
import { EditProfile } from './profile/EditProfileWrapper'
import Image from 'next/image'
import { slugify } from '../../_utils/utils'
import { Suspense } from 'react'
import type { Session } from 'next-auth'
import { updateUserById } from '../../_lib/updateUserById'
import { revalidatePath } from 'next/cache'
import { EditProfileWrapper } from './profile/EditProfileWrapper'
import { ObjectIdType, UserSession } from '../../_providers/JotaiProvider';

const updateUser = async (id: ObjectIdType, user: UserSession) => {
    'use server'

    console.log(id);
    console.log(user);

    if( user.id )
        delete user.id
    else if( user._id )
        delete user._id

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

    const { user } = await getServerSession(authOptions) as UserSession;

    if (user) {

        let hasName = user.name ? true : false;
        let hasRoles = user.roles ? true : false;
        let hasCompany = user.company ? true : false;
        let hasEmail = user.email ? true : false;

        return (

            <div className='w-9/12 mx-auto py-12 grid gap-8 grid-cols-6 auto-rows-min'>

                <div className={`
                    flex flex-col col-span-2 h-min items-center px-8 py-8 max-w-xs
                    bg-gradient-to-br from-indigo-900/50 via-cyan-900/50 to-blue-900/50
                    border-2 border-cyan-800 rounded-3xl`}>

                    <Image
                        src={`https://api.dicebear.com/6.x/bottts/png?seed=${slugify(user.email.split('@')[0])}}`}
                        width={100}
                        alt='User Avatar'
                        height={100}
                        className='rounded-full mask mask-hexagon bg-accent my-6'
                    />

                    <div className='text-sky-100 flex flex-col items-center justify-center text-center prose'>
                        {hasName ? (<h1 className='font-bold mb-6 my-5'>{user.name}</h1>) : null}
                        {hasCompany ? (<h3 className='font-semibold my-0'>{user.company}</h3>) : null}
                        {hasEmail ? (<h3 className='my-0 font-light'>{user.email}</h3>) : null}
                    </div>

                    {hasRoles ? (

                        <div className="mt-8">

                            {user.roles.map((thisRole) => (

                                <div className="badge badge-accent badge-lg font-mono text-white border-2 px-3 py-3 first-of-type:ml-0 ml-3">{thisRole}</div>

                            ))}

                        </div>

                    ) : null}


                    <div className='account-controls w-full'>
                        <AccountControls user={user} />
                    </div>

                </div>

                <div className={`
                    flex flex-col col-span-4 flex-grow`}>

                    <Suspense fallback={<div className="w-full h-full"></div>}>
                        <EditProfileWrapper updateUser={updateUser} />
                    </Suspense>

                </div>

            </div>

        );

    } else {

        redirect('/account/login');

    }

}

export default Account;
