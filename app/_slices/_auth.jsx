import { createAction, createReducer } from '@reduxjs/toolkit';
import { HYDRATE } from "next-redux-wrapper";

// Initial state
const initialState = {
	
	users: [

		{
			sub: "",
			email: "",
			authState: "unauthenticated",
			token: "",
		},

	],

};


export const logInUser = createAction('users/logIn');
export const signOutUser = createAction('users/signOut');

export const authReducer = createReducer((initialState, (builder) => {

	builder
		.addCase(logInUser, (state, action) => {

			return {

				...state,
				users: [
					...state.users,
					{
						...action.payload
					}
				]

			}

		})
		.addCase(signOutUser, (state, action) => {

			return {

				...state,
				items: state.items.filter((item) => {
					return item.sub !== action.payload.sub;
				})

			}

		});

}));