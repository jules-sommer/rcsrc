import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

// Initial state
const initialState = {
	sub: "",
	email: "",
	authState: "unauthenticated",
	token: "",
};

// Actual Slice
export const authSlice = createSlice({
	name: "users",
	initialState,
	reducers: {
		// Action to set the authentication status
		addNewUser(state, action) {

			const { sub, email, authState, token } = action.payload;

			state = {
				...state,
				sub: sub,
				email: email,
				authState: authState,
				token: token,
			};

		},
	},	

	// Special reducer for hydrating the state. Special case for next-redux-wrapper
	extraReducers: {
		[HYDRATE]: (state, action) => {
			return {
				...state,
				...action.payload.auth,
			};
		},
	},

});

export const { addNewUser } = authSlice.actions;

export const selectAuthState = (state) => state.auth.authState;

export default authSlice.reducer;