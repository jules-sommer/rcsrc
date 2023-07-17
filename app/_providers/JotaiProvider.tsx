'use client'

import { Provider, createStore, useAtomValue } from "jotai"
import { z } from 'zod';
import { v4 as uuid } from 'uuid';
import { atom } from "jotai";
import { loadable } from "jotai/utils";
import { signOut } from "next-auth/react";
import { focusAtom } from "jotai-optics";
import { useRef } from "react";

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
});

export type UserSession = z.infer<typeof zSession>;

export type User = z.infer<typeof zUser>;

export const sessionInitialState = {
	user: {
		_id: "",
		email: "",
		name: "",
	},
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

export const asyncFetchSession = atom(
	async (get) => {

		const raw = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/session`, {
			next: { revalidate: 60 },
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			},
		})

		return await raw.json();
		
	}
);

export const asyncSessionAtom = loadable(asyncFetchSession)

export const SessionInitialize = ({ session } : { session: UserSession }) => {

    const initialized = useRef(false);

    if (!initialized.current) {
        RCStore.set(sessionAtom, session);
        initialized.current = true;
    }

    return null;

}

export const useUserData = () => {

    const hasInitialized = useRef(false);
    const { state, data } = useAtomValue(asyncSessionAtom);

    if (state !== "hasData" || !data.session) {
        hasInitialized.current = true;
        return {
            authenticated: false,
            user: null,
        }
    }

    const { authenticated, session: { user } } = data;
    hasInitialized.current = true;

    return {
        authenticated,
        user
    }

}


export const sessionStorageAtom = atom(JSON.parse(localStorage.getItem('session')) ?? sessionInitialState);

export const isAuthenticatedAtom = atom(
	(get) => {

        const session = get(sessionStorageAtom);

        if( session )
            return session.user._id ? true : false;
		
        return false;

	}
)

export const sessionAtom = atom( 
	(get) => get(sessionStorageAtom), 
	(get, set, newSession) => { 
		set(sessionStorageAtom, newSession) 
		localStorage.setItem('session', JSON.stringify(newSession)) 
	}
)

const signOutWithAtoms = ({ redirect = false, callbackUrl = '/' } : { redirect: boolean, callbackUrl: string }) => {

	RCStore.set(sessionAtom, sessionInitialState)
	signOut({ redirect: false, callbackUrl: '/' })

	return true;

}

export const signOutAtom = atom(null,
	(get, set, { redirect = false, callbackUrl = '/' } : { redirect: boolean, callbackUrl: string }) => {
		signOutWithAtoms({ redirect, callbackUrl });
	}
)

export const userEmailAtom = atom(
	(get) => {
		const { user: { email } } = get(sessionAtom);
		return email;
	},
	(get, set, newEmail) => {
		const { user } = get(sessionAtom);
		set(sessionAtom, {
			...get(sessionAtom),
			user: {
				...user,
				email: newEmail
			},
		})
	}
);

/*
*   JOTAI CART ATOMS
*/

export const zCartItem = z.object({
    _id: z.string().default(uuid()),
    product: z.string(),
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
            ]).optional(),
        }).optional(),
        container: zObjectId.optional(),
        quantity: z.number().min(1).max(10000).default(1),
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
    createdAt: zUnixTime.optional(),
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