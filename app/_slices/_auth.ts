import {
	createSlice,
	PayloadAction,
	createReducer,
} from '@reduxjs/toolkit';
import { uniqueId } from 'lodash';

type userState = {
	value: {
		id: String;
		email: String;
		name: String;
		roles: String[];
		hasCart: Boolean;
		isAuthorized: "authorized" | "unauthorized" | "setup"
	},
	authEvents: authEvent[]
}

export type authEvent = {

	type: String;
	event: Object;

}

export const initialState = {
	value: {
		id: "",
		email: "",
		name: "",
		roles: ["User"],
		hasCart: false,
		isAuthorized: "unauthorized"
	},
	authEvents: [],
} as userState;

export type User = {

	id?: String;
	email: String;
	name: String;
	company?: String;
	researchIntent?: String;
	roles?: String[];
	hasCart?: Boolean;
	cartId?: String;
	emailVerified?: Boolean | null;
	isAuthorized?: "authenticated" | "unauthorized" | "loading";
	expiresAt?: Date;

}

export type AuthEvent = {
	type: String;
	event: Object;
}

const auth = createSlice({

	name: 'auth',
	initialState,
	reducers: {

		signUserOut: () => {
			return { ...initialState };
		},
		
		setLatestAuthEvent: ( state, action: PayloadAction<AuthEvent> ) => {
			
			const { type, event } = action.payload;

			return {
				...state,
				authEvents: [
					{
						type: type,
						event: event
					},
					...state.authEvents,
				]
			}

		},

		logUserIn: (state, action: PayloadAction<User>) => {
			
			const { 
				id, 
				email, 
				name, 
				roles, 
				hasCart, 
				isAuthorized
			} = action.payload;

			if( isAuthorized === "unauthorized" || isAuthorized === "loading" )
				return { ...initialState };

			return {
				value: {
					id: id,
					email: email,
					name: name,
					roles: roles ? roles : [],
					hasCart: hasCart ? hasCart : false,
					isAuthorized: isAuthorized === "authenticated" ? "authenticated" : "unauthorized"
				},
				authEvents: [
					...state.authEvents,
				]
			}

		}


	}

})

export const { signUserOut, logUserIn, setLatestAuthEvent } = auth.actions;
export default auth.reducer;