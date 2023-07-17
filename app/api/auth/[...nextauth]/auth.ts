import type { NextAuthOptions } from "next-auth";

import type { MongoDBAdapterOptions } from '@auth/mongodb-adapter';
import { MongoDBAdapter } from "@auth/mongodb-adapter";

import clientPromise from '../../../_lib/db';

import EmailProvider from "next-auth/providers/email";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

import chalk from 'chalk';

import { User, ObjectIdType } from '../../../_atoms/sessionInitialState';
import { updateUserById } from '../../../_utils/api';

import type { MongoClient } from 'mongodb';

export const authOptions: NextAuthOptions = {
    
    adapter: MongoDBAdapter(
        clientPromise as Promise<MongoClient>, 
        { databaseName: 'next_auth' } as MongoDBAdapterOptions
    ),
    
    providers: [

        /* DISABLING CREDENTIALS PROVIDER ON ACCOUNT OF: https://next-auth.js.org/providers/credentials
"The functionality provided for credentials based authentication is intentionally limited to discourage use
of passwords due to the inherent security risks associated with them and the additional complexity associated
with supporting usernames and passwords." - AuthJs Docs ( it disabled MongoDBAdapter and prevents persisting 
sessions to the DB ).

        CredentialsProvider({
            
            name: "Sign in",
            credentials: {
                email: {
                    label: "Email",
                    type: "email",
                    placeholder: "example@example.com",
                },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {

                const user = {
                    email: 'jules@rcsrc.shop',
                    password: 'bc82ee65fd',
                }

                if (!credentials?.email || !credentials.password) {
                    return null;
                }

                if(credentials?.email !== user.email || credentials?.password !== user.password) {
                    return null;
                }
                
                return {
                    id: uniqueId(),
                    email: user.email,
                    name: 'Jules Sommer',
                    roles: [
                        'admin',
                        'kitten'
                    ]
                };

            },

        }),
*/
        GithubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
            profile: async (profile, tokens) => {
                return await profile;
            }, 
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID as string,
            clientSecret: process.env.GOOGLE_SECRET as string,
            profile: async (profile, tokens) => {
                return await profile;
            }, 
        }),
        EmailProvider({
            server: {
                
                host: process.env.EMAIL_SERVER_HOST as string,
                port: process.env.EMAIL_SERVER_PORT as string,

                auth: {
                    user: process.env.EMAIL_SERVER_USER as string,
                    pass: process.env.EMAIL_SERVER_PASSWORD as string
                }

            },
            from: process.env.EMAIL_FROM
        }),
    ],

    callbacks: {

        signIn: async({ user, account, profile, email, credentials }) => {

            console.log(chalk.bgBlueBright(JSON.stringify(user)));
            console.log(chalk.bgGreenBright(JSON.stringify(account)));
            console.log(chalk.bgWhiteBright(JSON.stringify(profile))); // undefined

            return { user, account, profile };

        },

        jwt: async({ token, user, trigger }) => {

            if( trigger === 'update' )
                console.log(chalk.bgRedBright('JWT UPDATE TRIGGERED'));

            if( user ) {
                console.log(chalk.magentaBright(JSON.stringify(token)));
                console.log(chalk.bgBlueBright(JSON.stringify(user)));
            }

            return { 
                token: token
            };

        },
        
        session: async({ session, trigger, token, user, newSession }) => {

            if( session.user.id ) {
                session.user._id = session.user.id as ObjectIdType;
                delete session.user.id;
            }

            if( trigger === 'update' ) {

                console.log(chalk.bgRedBright('SESSION UPDATE TRIGGERED'));
                console.log(chalk.bgRedBright(JSON.stringify(newSession)));

                try {

                    const result = await updateUserById({ _id: session.user.id as string, user: newSession as User });

                    if( result.success == true ) {

                        console.log(typeof result);
                        console.log(chalk.bgGreenBright(JSON.stringify(result.data.fieldsAdded)));

                        return {
                            ...session,
                            user: result.data.updatedUser
                        };

                    } else {

                        throw new Error('Failed to update user in database');
                        return {
                            ...session,
                            user:  { ...user }
                        };

                    }

                } catch( error ) {

                    console.log(chalk.bgRedBright(JSON.stringify(error)));

                    return {
                        ...session,
                        user:  { ...user }
                    };

                }

            }

            return {
                ...session,
                user:  { ...user }
            };

        },

    },

    events: {

        signIn: async(message) => {

            console.log(`Sign in event`);
            console.log(message);

        },

        signOut: async(message) => {

            console.log(`Sign out event`);
            console.log(message);

        },

        createUser: async(message) => {
            
            console.log(`Create user event`);
            console.log(message);

        },

        updateUser: async(message) => {

            console.log(`Update user event`);
            console.log(message);

        },

        linkAccount: async(message) => {
            
            console.log(`Link account event`);
            console.log(message);

        },

        session: async(message) => {

            console.log(`Session event`);
            console.log(message);

        },

    },

    pages: {

        signIn: '/account/login',
        verifyRequest: '/account/login?verifyRequest=true&provider=magicLink',
        newUser: '/account/login?onboarding=true'
        
    },

}