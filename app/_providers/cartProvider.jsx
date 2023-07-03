/* eslint-disable no-case-declarations */
/* eslint-disable nonblock-statement-body-position */
/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */

'use client';

import {
	createContext, useReducer, useEffect, useMemo,
} from 'react';

import { useIsClient } from './isClientProvider';
import { usePathname, useRouter } from 'next/navigation';

export const CartStateContext = createContext(null);
export const CartDispatchContext = createContext(null);

const CartContextProvider = ({ children }) => {

	const pathname = usePathname();
	const router = useRouter();
	const isClient = useIsClient();

	const cartReducer = (state, action) => {

		switch (action.type) {

			case 'LOCAL_STORE_EXISTS':

				return { ...action.value };

			case 'REPLACE_CART_ITEMS':

				let isEmpty = true;

				if (action.newItems.length >= 0)
					isEmpty = false;

				const items = action.newItems;

				return {
					...state,
					items,
					isEmpty,
				};

			case 'REMOVE_CART_ITEM':

				// check if cartItem has a totalCost property, if it does, we need to remove it from the total cart cost
					
				if (Object.hasOwn(action.cartItem, 'totalCost') === false)
					throw new Error('CART ITEM DOES NOT HAVE A TOTAL COST PROPERTY... ( cartReducer, case: "REMOVE_CART_ITEM", cartProvider.jsx )');

				// check if totalCost is a number and is greater than or equal to zero, if not throw an error
				if (typeof action.cartItem.totalCost !== 'number' || action.cartItem.totalCost > 0)
					throw new Error('CART ITEM TOTAL COST IS NOT A NUMBER OR IS LESS THAN OR EQUAL TO ZERO... ( cartReducer, case: "REMOVE_CART_ITEM", cartProvider.jsx )');

				const costOfCartItem = action.cartItem.totalCost;
				const cartTotal = state.cartTotal - costOfCartItem;
				
				console.log(`NEW CART TOTAL: ${cartTotal}...`);

				return {
					...state,
					items: state.items.filter((item) => item.itemID === action.cartItem.itemID), // removes the item from the cart via es6 filter array
					cartTotal,
				};

			// Takes state and replaces it with new state entirely
			case 'REPLACE_STATE':

				return { ...action.newState };

			// updates the total cart cost by adding or subtracting a value
			case 'UPDATE_CART_TOTAL':

				console.log(state.cartTotal);
				// eslint-disable-next-line no-case-declarations
				let newTotal = state.cartTotal;

				console.log(`FROM CartProvide: I am updating the total cart cost by ${action.operator}ing ${action.value}...`);

				if (action.operator === 'ADD') newTotal += action.value;
				if (action.operator === 'SUB') newTotal -= action.value;
				if (action.operator === 'REPLACE') newTotal = action.value;

				console.log(`FROM CartProvide: New total is ${newTotal}...`);

				return {
					...state,
					cartTotal: newTotal,
				};

			// ADDS A NEW ITEM TO THE CART
			case 'ADD_TO_CART':

				console.log(`I AM ADDING: ${action.cartItem} to CART!`);

				return {
					...state,
					items: [...state.items, {
						...action.cartItem,
					}],
					isEmpty: false, // must not be empty because we are adding an item

				};


			// empties the cart
			case 'EMPTY_CART':

				return {
					...state,
					items: [],
					isEmpty: true,
				};

			// updates the UI for cart open or closed
			case 'TOGGLE_OPEN':

			console.log(action.pathname);

			if (action.isOpen == true) {

				router.push('/cart');

				return {

					...state,
					isOpen: {
						state: true,
						returnUrl: pathname,
					},

				};

			} if (action.isOpen == false) {

				if (action.pathname !== false)
					router.push(action.pathname);
				else
					router.push(state.isOpen.returnUrl);

				return {

					...state,
					isOpen: {
						state: false,
						returnUrl: false,
					},

				};

			}

			return { ...state };

			default:

				console.log('DEFAULT');
				return { ...state };

		}

	};

	// initial cart state

	const initialState = {

		items: [],
		cartTotal: 0,
		paymentMethod: false,
		isEmpty: true,

	};

	const [ state, dispatch ] = useReducer(cartReducer, initialState);

	useEffect(() => {

		const localStore = JSON.parse(localStorage.getItem('cartStore'));

		if (localStore)
			dispatch({ type: 'LOCAL_STORE_EXISTS', value: localStore });
			
	}, []);

	useMemo(() => {

		if (isClient && state !== initialState)
			window.localStorage.setItem('cartStore', JSON.stringify(state));

	}, [state.items]);

	return (

		<CartStateContext.Provider value={state}>
			<CartDispatchContext.Provider value={dispatch}>
				{children}
			</CartDispatchContext.Provider>
		</CartStateContext.Provider>

	);

};

export default CartContextProvider;
