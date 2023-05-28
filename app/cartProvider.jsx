"use client"

import { useState, useContext, createContext, useReducer, useMemo, useEffect } from 'react';
import { usePathname } from 'next/navigation';

import createPersistedState from 'use-persisted-state';

export const CartStateContext = createContext(null);
export const CartDispatchContext = createContext(null);

const CartContextProvider = ({ children }) => {

    const useCartStateLocalStorage = createPersistedState('cartState');

    const pathname = usePathname();

    const cartReducer = (state, action) => {

        switch ( action.type ) {

            case 'REPLACE_CART_ITEMS': 

                return {
                    ...state,
                    items: action.newItems,
                }

            case 'UPDATE_CART_TOTAL':

                console.log(state.cartTotal);
                
                if( action.operator === 'ADD' ) { 

                    return {
                        ...state,
                        cartTotal: cartTotal += action.amount,
                    }

                } else if( action.operator === 'SUB' ) {

                    return {
                        ...state,
                        cartTotal: cartTotal -= action.amount,
                    }

                }

            case 'ADD_TO_CART':

                console.log(`I AM ADDING: ${action.cartItem} to CART!`)

                return {
                    ...state,
                    items: [...state.items, action.cartItem],
                    isEmpty: false,

                }

            case 'UPDATE_CART_STATE':

                console.log(pathname);

                if( action.isOpen == true ) {

                    return {

                        ...state,
                        isOpen: {
                            state: true,
                            returnUrl: pathname,
                        },

                    }

                } else if( action.isOpen == false ) {

                    return {
                        
                        ...state,
                        isOpen: {
                            state: false,
                            returnUrl: null,
                        }

                    }

                } else {

                    return { ...state };

                }

            default:

                console.log('DEFAULT');
                return { ...state };

        } 

    }

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

        var hasLocalStore = false;

        if( localCartItems.length !== 0 && localCartItems !== state.items ) {

            dispatch({ type: 'REPLACE_CART_ITEMS', newItems: localCartItems });
            hasLocalStore = true; // trip flag

        } else if( localCartItems.length == 0 && state.items.length > 0 ) {

            setLocalCartItems(state.items);

        }

        console.log(`localCartItem: ${JSON.stringify(localCartItems, undefined, 4)} ( from CartProvider.jsx )`);


    }, [state]);


    return (

        <CartStateContext.Provider value={state}>
            <CartDispatchContext.Provider value={dispatch}>
                {children}
            </CartDispatchContext.Provider>
        </CartStateContext.Provider>

    )

}

export default CartContextProvider;