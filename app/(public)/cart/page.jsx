/* eslint-disable no-unused-vars */
/* eslint-disable react/react-in-jsx-scope */

'use client';

import { useContext } from 'react';
import { CartStateContext, CartDispatchContext } from '../../_providers/cartProvider';
import CartListItem from '../../_primitives/CartListItem';
import Formatter from '../../_utils/moneyFormatter';

const Cart = () => {

	const state = useContext(CartStateContext);
	const cartDispatch = useContext(CartDispatchContext);

	const cartItems = state.items; 

	return (

		<>

		<div className="w-full mx-auto grid grid-flow-col grid-cols-6">

			<h1 className="font-mono text-2xl text-sky-200">Your Cart</h1>

			{cartItems.map((thisItem, index) => <CartListItem cartItemObj={thisItem} />)}

			<p className='font-mono text-xl text-sky-300'>
				Total Cost:
				{Formatter.format(parseFloat(state.cartTotal))}
			</p>

		</div>

			<pre className='text-sky-200 mx-full p-12 whitespace-pre-wrap'>{JSON.stringify(state, null, 2)}</pre>

		</>

	)

};

export default Cart;
