/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/react-in-jsx-scope */

'use client';

import { useContext } from 'react';
import NavLink from '../navLink';
import { usePathname, useRouter } from 'next/navigation';
import { CartStateContext, CartDispatchContext } from '../cartProvider';
import { useIsClient } from '../isClientProvider';

const HeaderCartIcon = () => {

	const state = useContext(CartStateContext);
	const dispatch = useContext(CartDispatchContext);
	const isClient = useIsClient();

	const router = useRouter();
	const pathname = usePathname();

	if (isClient && pathname)
		console.table({ pathname });

	if (isClient && pathname !== '/cart') {

		return (

			<nav className="flex select-none items-center justify-center">
				<NavLink classes="!mr-0 items-center justify-center flex" href="/cart">
					<button type="button" className="material-symbols-rounded" onClick={
						() => {
							dispatch({ type: 'TOGGLE_OPEN', isOpen: true })
							router.push('/cart');
						}
					}>Shopping_cart</button>
					{state.items.length > 0 ? (
						<span className="relative right-[0.2rem] -top-[1rem] flex items-center justify-center text-sm w-5 h-5 bg-emerald-700 rounded-full">{state.items.length}</span>
					) : null}
				</NavLink>
			</nav>

		);
	
	} else if( isClient ) {

		return (

			<nav className="flex select-none items-center justify-center">
				<NavLink classes="!mr-0 items-center justify-center flex" href="/">
					<button type="button" className="material-symbols-rounded" onClick={
						() => {
							dispatch({ type: 'CHECKOUT', isOpen: true })
							router.push('/');
						}
					}>keyboard_double_arrow_up</button>
				</NavLink>
		
			</nav>
			
		);

	}

};

export default HeaderCartIcon;
