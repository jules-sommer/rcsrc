'use client'

import {
	createSlice,
	PayloadAction,
	createReducer,
	createAsyncThunk
} from '@reduxjs/toolkit';
import { produce } from 'immer';
import { z } from 'zod';
import { uniqueId } from 'lodash';
import { v4 as uuid } from 'uuid';
import { useSWR } from 'swr';

export const zUnixTime = z.number().min(963365585).max(32520274385).default(Date.now());
export type UnixTime = z.infer<typeof zUnixTime>;

export const zProviders = z.union([
	z.literal("github"),
	z.literal("google"),
	z.literal("magicLink"),
	z.literal("credentials")
]);

export type Providers = z.infer<typeof zProviders>;

export const zObjectId = z.string().regex(/^[0-9a-f]{24}$/);;

/**
 * @type zAuthEvent: AUTH EVENT TYPE DEFINITION
 * @description zod type for emitting events that are used to track a user's
 *				activities throughout the app.
 */

export const zAuthEvent = z.object({
	type: z.union([
		z.literal("signIn"),
		z.literal("signOut"),
		z.literal("magicLinkSent"),
		z.literal("magicLinkConfirmed"),
		z.literal("sentToOAuthProvider"),
		z.literal("updateProfile"),
		z.literal("sessionTimeOut"),
	]).or(
		z.string().min(3).max(20).default('authEvent')
	),
	meta: z.object({
		time: zUnixTime,
		message: z.string().min(3).optional(),
		provider: zProviders.default("magicLink").optional(),
	}),
});

export type AuthEvent = z.infer<typeof zAuthEvent>

/**
 * @type zUser: USER TYPE DEFINITION
 * @description zod type for users that can be used to validate user objects,
 * 				including those from the database, also creates a TS type.
 */

export const zUser = z.object({

	_id: zObjectId,
	email: z.string().email(),
	name: z.string(),
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

export type User = z.infer<typeof zUser>;

/**
 * @END : USER TYPE DEFINITION
 * 
 * @type zAuthState: Initial state type
 */

export const zAuthState = z.object({

	user: zUser.optional(),
	authEvents: z.array(zAuthEvent).optional().default([]),
	status: z.union([
		z.literal("authenticated"),
		z.literal("unauthenticated"),
		z.literal("loading"),
	]).optional().default("unauthenticated"),

}, { invalid_type_error: "Type Error: Initial state did not parse against zInitState." })

export type AuthState = z.infer<typeof zAuthState>;

export const initialState = {
	user: null,
	authEvents: [],
	status: "unauthenticated",
} as AuthState;

const fetcher = ( url: string ) => fetch( url ).then( res => res.json() );

const fetchSession = createAsyncThunk(
	'auth/fetchSession',
	async (email: string, thunkAPI) => {

	const { dispatch, getState } = thunkAPI;
	
	if( email ) 
		console.log(`Prefetching profile of email ${email}...`)

	const { success, data, isLoading } = useSWR( `${process.env.NEXT_PUBLIC_API_URL}/api/session`, fetcher, { revalidateOnFocus: true })

	const state: AuthState = getState();

	if( state.status === "loading" ) {

		console.log( state );

		dispatch(auth.actions.setLatestAuthEvent({
			type: "fetchSession",
			meta: {
				time: Date.now(),
				message: "Fetching session from server.",
				provider: null,
			}
		}));

	}

	if( success && data )
		return data.user;

});

const auth = createSlice({

	name: 'auth',
	initialState,
	reducers: {

		signUserOut: () => {
			return { ...initialState };
		},
		
		setLatestAuthEvent: ( state: AuthState, action: PayloadAction<AuthEvent> ) => {
			
			const { type, meta: { time, message, provider } } = action.payload;

			console.log(action.payload);

			const newState = produce( state, draft => {

				console.log(draft);

				state["authEvents"].push({
					type: type,
					meta: {
						time: time,
						message: message,
						provider: provider,
					}
				});

			})

			console.log(newState)

			const { success } = zAuthState.safeParse( newState );

			if( !success ) {
				console.log(`Error parsing session ( REDUX: auth/fetchSession ):`);
				console.log(zAuthState.safeParse( newState ));
				return state;
			}

			return newState;

		},

	},
	
	extraReducers: ( builder ) => {
		
		builder.addCase( fetchSession.pending, ( state, action ) => {
			const newState = produce( state, draft => {
				draft.status = "loading";
			});
			console.log(zAuthState.safeParse( newState ));
			return newState;
		}),
		builder.addCase( fetchSession.fulfilled, ( state, action ) => {
			const newState = produce( state, draft => {
				draft.status = "authenticated";
				draft.user = action.payload.user;
			});
			console.log(zAuthState.safeParse( newState ));
			return newState;
		}),
		builder.addCase( fetchSession.rejected, ( state, action ) => {
			const newState = produce( state, draft => {
				draft.status = "unauthenticated";
			});
			console.log(zAuthState.safeParse( newState ));
			return newState;
		})

	}

})

export const { signUserOut, setLatestAuthEvent } = auth.actions;
export default auth.reducer;