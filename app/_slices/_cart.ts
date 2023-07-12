'use client'

import {
	createSlice,
	PayloadAction,
	createReducer,
} from '@reduxjs/toolkit';
import { produce } from "immer"
import { uniqueId } from 'lodash';

type cartState = {
	sub: String;
	items: CartItem[];
	total: Number;
	paymentMethod: {
		type: String;
		data: Object[];
	},
	shippingAddress: {
		fullName: String;
		street: String;
		city: String;
		postalCode: String;
		country: String;
	},
	pending: Boolean;
	error: Boolean;
}

const initialState = {
	sub: '',
	items: [],
	total: 0,
	paymentMethod: {
		type: '',
		data: [],
	},
	shippingAddress: {
		fullName: '',
		street: '',
		city: '',
		postalCode: '',
		country: 'Canada',
	},
	pending: true,
	error: false,
} as cartState;

export type CartItem = {

	id: String;
	name: String;
	properties: Object[];
	quantity: Number;
	price: Number;

}

const cart = createSlice({

	name: 'cart',
	initialState,
	reducers: {
		emptyCart: () => {
			return { ...initialState };
		},
		addItem: (state, action: PayloadAction<CartItem>) => {
			return {
				...state,
				items: [
					...state.items,
					action.payload
				],
			}
		}
	}

})

export const { emptyCart, addItem } = cart.actions;
export default cart.reducer;