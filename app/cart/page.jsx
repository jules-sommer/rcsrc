/* eslint-disable no-unused-vars */
/* eslint-disable react/react-in-jsx-scope */

'use client';

import { useContext } from 'react';
import { CartStateContext, CartDispatchContext } from '../cartProvider';
import CartListItem from '../CartListItem';
import Image from 'next/image';

const Cart = () => {

	const state = useContext(CartStateContext);
	const cartDispatch = useContext(CartDispatchContext);

	// eslint-disable-next-line react/destructuring-assignment
	let cartItems = state.items;

	console.error(cartItems);

	return (

		<div className="max-w-4xl mx-auto">

			<h1 className="font-mono text-2xl text-sky-200">Your Cart</h1>

			{cartItems.map((thisItem, index) => <CartListItem cartItemObj={thisItem} />)}

		</div>

	)

};

export default Cart;
