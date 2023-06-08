/* eslint-disable nonblock-statement-body-position */
/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */

'use client';

import {
	createContext, useReducer, useEffect,
} from 'react';
import { usePathname } from 'next/navigation';

import createPersistedState from 'use-persisted-state';

export const CartStateContext = createContext(null);
export const CartDispatchContext = createContext(null);

const CartContextProvider = ({ children }) => {

	const useCartStateLocalStorage = createPersistedState('cartState');

	const pathname = usePathname();

	const cartReducer = (state, action) => {

		switch (action.type) {

		case 'REPLACE_CART_ITEMS':

			let isEmpty = true;

			if( action.newItems.length >= 0 )
				isEmpty = false;

			return {
				...state,
				items: action.newItems,
				isEmpty: isEmpty,
			};

		case 'REPLACE_STATE':

			return { ...action.newState };

		case 'UPDATE_CART_TOTAL':

			console.log(state.cartTotal);

			if (action.operator === 'ADD') {

				return {
					...state,
					cartTotal: cartTotal += action.amount,
				};

			} if (action.operator === 'SUB') {

				return {
					...state,
					cartTotal: cartTotal -= action.amount,
				};

			}
			
			return {...state};

		case 'ADD_TO_CART':

			console.log(`I AM ADDING: ${action.cartItem} to CART!`);

			return {
				...state,
				items: [...state.items, action.cartItem],
				isEmpty: false,

			};

		case 'EMPTY_CART':
			
			return {
				...state,
				items: [],
				isEmpty: true,
			}

		case 'UPDATE_CART_STATE':

			console.log(pathname);

			if (action.isOpen == true) {

				return {

					...state,
					isOpen: {
						state: true,
						returnUrl: pathname,
					},

				};

			} if (action.isOpen == false) {

				return {

					...state,
					isOpen: {
						state: false,
						returnUrl: null,
					},

				};

			}

			return { ...state };

		default:

			console.log('DEFAULT');
			return { ...state };

		}

	};

	const initialState = {

		items: [],
		cartTotal: 0,
		paymentMethod: false,
		isEmpty: true,
		isOpen: { state: false, returnUrl: null },

	};

	const [state, dispatch] = useReducer(cartReducer, initialState);
	const [localCartItems, setLocalCartItems] = useCartStateLocalStorage(initialState);

	useEffect(() => {

		let hasExistingState = true;
		let hasLocalStoreState = true;

		if( state.items.length === 0 )
			hasExistingState = false;

		if( !localCartItems.items )
			hasLocalStoreState = false;

		if( !hasExistingState && !hasLocalStoreState ) {

			// no local or existing state exists

		} else if( hasExistingState && !hasLocalStoreState) {

			setLocalCartItems({ ...state });

		} else if( !hasExistingState && hasLocalStoreState ) {

			dispatch({ type: 'REPLACE_STATE', newState: { ...localCartItems } });

		} else {

			// There is local store and existing state

			if( JSON.stringify(localCartItems, undefined, 2) === JSON.stringify(state, undefined, 2) )
				console.log(`state and localStoreState are equal....`);
			else
				console.log(`state and localStoreState are *NOT* equal....`);

		}

		console.log(`hasExistingState: ${hasExistingState}`);
		console.log(`hasLocalStoreState: ${hasLocalStoreState}`);
		console.log(`localStoreCart: ${JSON.stringify(localCartItems, undefined, 4)}`)

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
