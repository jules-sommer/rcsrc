'use client'

import { Provider, createStore, useAtom, useAtomValue, useSetAtom } from "jotai"
import { z } from 'zod';
import { v4 as uuid } from 'uuid';
import { atom } from "jotai";
import { atomWithStorage, loadable } from "jotai/utils";
import { signOut } from "next-auth/react";
import { focusAtom } from "jotai-optics";
import { useRef } from "react";
import { useStyleRegistry } from "styled-jsx";

/*
*   CREATE JOTAI STORE
*/
export const RCStore = createStore();

/*
*   DEFINE ZOD SCHEMAS FOR USER DATA
*/

export const zUnixTime = z.number().min(963365585).max(32520274385).default(Date.now());
export type UnixTime = z.infer<typeof zUnixTime>;

export const zObjectId = z.string().regex(/^[0-9a-f]{24}$/);
export type ObjectIdType = z.infer<typeof zObjectId>;

export const zUser = z.object({
	_id: zObjectId,
	email: z.string().email(),
	name: z.string(),
	company: z.string().optional(),
	createdAt: zUnixTime.optional(),
	updatedAt: zUnixTime.optional(),
	roles: z.array(z.union([
		z.literal("customer"),
		z.literal("admin"),
		z.literal("visitor"),
		z.literal("kitten")
	])),
	emailVerified: z.boolean().optional(),
	carts: z.array(zObjectId).optional(),
	orders: z.array(zObjectId).optional(),
	addresses: z.array(z.object({
		_id: z.string().default(uuid()),
		unit: z.string().optional(),
		street: z.string(),
		city: z.string(),
		province: z.union([
			z.literal("AB"),
			z.literal("BC"),
			z.literal("MB"),
			z.literal("NB"),
			z.literal("NL"),
			z.literal("NS"),
			z.literal("NT"),
			z.literal("NU"),
			z.literal("ON"),
			z.literal("PE"),
			z.literal("QC"),
			z.literal("SK"),
			z.literal("YT"),
		]),
		postalCode: z.string().regex(/^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/),
		country: z.string().default("Canada"),
	})).optional(),
	isAuthorized: z.array(z.union([
		z.literal("authenticated"),
		z.literal("unauthenticated"),
		z.literal("loading"),
	])),
}, { invalid_type_error: "Type Error: Users state did not parse against zUser type." });

export type ISODateString = string;

export const zSession = z.object({
	user: zUser,
	expires: z.string(),
	authenticated: z.boolean(),
});

export type UserSession = z.infer<typeof zSession>;

export type User = z.infer<typeof zUser>;

export const sessionInitialState = {
	user: {
		_id: "",
		email: "",
		name: "",
	},
	authenticated: false,
	expires: undefined
};

/*
*   DEFINE JOTAI ATOMS
*/

export interface SessionApiResponse {

    state: "loading" | "hasData" | "error",
    data: {
        authorized: Boolean,
        session: UserSession,
        message?: String,
    }

}

export const fetchedSessionAtom = atom<UserSession>({
	user: null,
	authenticated: false,
})

export const asyncFetchSession = atom(
	null,
	async (get, set) => {

		const raw = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/session`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			},
		}).then(async (response) => {
			
			const result = await response.json();
			
			console.log(result);
			
			if(response) {
				set(hasFetchedAtom, true)
				set(fetchedSessionAtom, result)
				return response
			}

		}).catch((error) => {

			return error;

		});
	}
);

export const hasFetchedAtom = atomWithStorage('hasFetched', false);

export const SessionInitialize = ({ session } : { session: UserSession }) => {

    const initialized = useRef(false);
	const [, setSession] = useAtom(asyncFetchSession);

    if (!initialized.current) {
		setSession()
		RCStore.set(sessionAtom, {
			...session,
		});
        initialized.current = true;
    }

    return null;

}

export const sessionStorageAtom = atom(JSON.parse(localStorage.getItem('session')) ?? sessionInitialState);

export const sessionAtom = atom( 
	(get) => get(sessionStorageAtom), 
	(get, set, newSession) => { 
		set(sessionStorageAtom, newSession) 
		localStorage.setItem('session', JSON.stringify(newSession)) 
	}
)

export const useUser = () => {

	const { user } = useAtomValue(sessionAtom);

	if( user )
		return {
			authenticated: true,
			user,
		} as UserSession;
	else
		return {
			authenticated: false,
			user,
		} as UserSession;

}


export const isAuthenticatedAtom = atom(
	(get) => {

        const session = get(sessionStorageAtom);

        if( session )
            return session.authenticated;
		
        return false;

	}
)

const signOutWithAtoms = ({ redirect = false, callbackUrl = '/' } : { redirect: boolean, callbackUrl: string }) => {

	RCStore.set(sessionAtom, sessionInitialState)
	signOut({ redirect: redirect, callbackUrl: callbackUrl })

	return true;

}

export const signOutAtom = atom(null,
	(get, set, { redirect = false, callbackUrl = '/' } : { redirect: boolean, callbackUrl: string }) => {
		signOutWithAtoms({ redirect, callbackUrl });
	}
)

export const prefetchUserProfileAtom = atom(
	null,
	async (get, set, email) => {

		const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/read/email`, {
            method: 'POST',
            body: JSON.stringify({
                email: email
            }),
            headers: {
                'content-type': 'application/json',
                'accept': 'application/json'
            }
        });

		return await result.json();
	
	}

);

export const userEmailAtom = atom(

	(get) => {

		const user = get(sessionAtom);
		if( user == null )
			return null;

		const { user: { email } } = user;
		return email;

	},

	(get, set, newEmail) => {

		const session = get(sessionAtom);

		if( session == null ) {
			
			set(sessionAtom, {
				...sessionInitialState,
				user: {
					email: newEmail
				}
			})

		} else {

			const { user } = session;

			set(sessionAtom, {
				...get(sessionAtom),
				user: {
					...user,
					email: newEmail
				},
			})
		
		}

	}
);

/*
*   JOTAI CART ATOMS
*/

export const zCartItem = z.object({
    _id: z.string().uuid().default(uuid()),
    product: z.object({
		_id: zObjectId,
		name: z.string(),
		CAS: z.string().optional(),
		smiles: z.string().optional(),
	}),
    configuration: z.object({
        format: z.union([
            z.literal("powder"),
            z.literal("solution"),
        ]),
        solvent: zObjectId.optional(),
        concentration: z.object({
            value: z.number().min(0).max(100).optional(),
            unit: z.union([
                z.literal("mg/mL"),
                z.literal("ug/mL"),,
                z.literal("mg/L")
            ]).default("mg/mL").optional(),
        }).optional(),
        container: zObjectId.optional(),
    }),
	quantity: z.object({
		value: z.number().min(1).max(10000).default(1),
		unit: z.union([
			z.literal("mg"),
			z.literal("g"),
			z.literal("kg"),
		]).default("mg").optional(),
	}),
    createdAt: zUnixTime.optional(),
    updatedAt: zUnixTime.optional(),
});

export type CartItem = z.infer<typeof zCartItem>;

export const zCart = z.object({
    _id: z.string().default(uuid()),
    user: zObjectId,
    items: z.array(zCartItem),
    total: z.number().min(0).max(1000000).default(0),
	confirmed: z.union([z.literal(true), z.literal(false)]).default(false),
    createdAt: zUnixTime.optional(),
	paymentDue: zUnixTime.optional(),
    updatedAt: zUnixTime.optional(),
});

export type Cart = z.infer<typeof zCart>;

export const cartAtom = atom({
    _id: "" as uuid,
    user: "" as ObjectIdType,
    items: [] as CartItem[],
    total: 0 as number,
    createdAt: 0 as UnixTime,
    updatedAt: 0 as UnixTime,
} as Cart);

export const totalAtom = focusAtom(cartAtom, (optic) => optic.prop("total"));

/*
*   EXPORT JOTAI PROVIDER WRAPPER
*/

export const JotaiProvider = ({children}) => {

    return (

        <Provider store={RCStore}>
            {children}
        </Provider>

    )

}