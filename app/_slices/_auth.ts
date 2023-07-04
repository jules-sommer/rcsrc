import {
	createSlice,
	PayloadAction,
	createReducer,
} from '@reduxjs/toolkit';
import { Auth } from '@aws-amplify/auth';
import { uniqueId } from 'lodash';

type userState = {
	value: {
		sub: String;
		email: String;
		name: String;
		roles: String[];
		hasCart: Boolean;
		isAuthorized: "authorized" | "idle" | "setup"
	},
	latestAuthEvent: {
		type: String;
		event: Object;
	}
}

const initialState = {
	value: {
		sub: "",
		email: "",
		name: "",
		roles: [],
		hasCart: false,
		isAuthorized: "setup"
	},
	latestAuthEvent: {
		type: "",
		event: {}
	}
} as userState;

export type User = {

	sub: String;
	email: String;
	name: String;
	roles?: String[];
	hasCart?: Boolean;
	isAuthorized?: "authorized" | "idle" | "setup"

}

type AuthEvent = {
	type: String;
	event: Object;
}

const cart = createSlice({

	name: 'cart',
	initialState,
	reducers: {

		signUserOut: () => {
			return { ...initialState };
		},
		
		setLatestAuthEvent: ( state, action: PayloadAction<AuthEvent> ) => {
			
			const { type, event } = action.payload;

			return {
				...state,
				latestAuthEvent: {
					type: type,
					event: event
				}
			}

		},

		logUserIn: (state, action: PayloadAction<User>) => {
			
			const { sub, email, name, roles, hasCart, isAuthorized } = action.payload;

			return {
				...state,
				value: {
					sub: sub,
					email: email,
					name: name,
					roles: roles ? roles : [],
					hasCart: hasCart ? hasCart : false,
					isAuthorized: isAuthorized
				}
			}

		}


	}

})

export const { signUserOut, logUserIn, setLatestAuthEvent } = cart.actions;
export default cart.reducer;