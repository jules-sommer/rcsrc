/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/react-in-jsx-scope */

'use client';

import {
	Fragment, useContext,
} from 'react';
import { Dialog, Disclosure, Transition } from '@headlessui/react';
import { useRouter, usePathname, getServerSidedParams } from 'next/navigation';
import { XMarkIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { CartStateContext, CartDispatchContext } from '../../cartProvider';
import CartListItem from '../../CartListItem';
import Formatter from '../../moneyFormatter';
import { useIsClient } from '../../isClientProvider';
import { useCartOpen } from '../../useCartOpen';

const CartModal = () => {

	const router = useRouter();
	const pathname = usePathname();

	const isOpen = useCartOpen();

	console.log(`CART IS OPEN: ${isOpen} ( from cartModal.jsx )`);

	const state = useContext(CartStateContext);
	const cartDispatch = useContext(CartDispatchContext);

	// eslint-disable-next-line react/destructuring-assignment

	return (
		<Transition.Root
			show={isOpen}
			appear
			as={Fragment}
		>
			<Dialog
				as="div"
				className="relative z-50"
				onClose={() => {
					router.back();
				}}
			>
				<Transition.Child
					as={Fragment}
					enter="ease-in-out duration-500"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in-out duration-500"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
				</Transition.Child>

				<div className="fixed inset-0 overflow-hidden">
					<div className="absolute inset-0 overflow-hidden">
						<div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
							<Transition.Child
								as={Fragment}
								enter="transform transition ease-in-out duration-500 sm:duration-700"
								enterFrom="translate-x-full"
								enterTo="translate-x-0"
								leave="transform transition ease-in-out duration-500 sm:duration-700"
								leaveFrom="translate-x-0"
								leaveTo="translate-x-full"
							>
								<Dialog.Panel className="pointer-events-auto relative w-screen max-w-md">
									<Transition.Child
										as={Fragment}
										enter="ease-in-out duration-500"
										enterFrom="opacity-0"
										enterTo="opacity-100"
										leave="ease-in-out duration-500"
										leaveFrom="opacity-100"
										leaveTo="opacity-0"
									>
										<div className="absolute left-0 top-0 -ml-8 flex pr-2 pt-4 sm:-ml-10 sm:pr-4">
											<button
												type="button"
												className="rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
												onClick={() => {
													router.back();
												}}
											>
												<span className="sr-only">Close panel</span>
												<XMarkIcon className="h-6 w-6" aria-hidden="true" />
											</button>
										</div>
									</Transition.Child>
									<div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
										<div className="px-4 sm:px-6">
											<Dialog.Title className="text-base font-semibold leading-6 text-gray-900">
												Your Shopping Cart
											</Dialog.Title>
										</div>
										<div className="relative mt-6 grid grid-flow-col grid-cols-1 grid-rows-4 w-full px-4 sm:px-6 gap-4">

											{state.items.length === 0 ? (

												// CART IS EMPTY, SHOW AN EMPTY CART DIALOGUE

												<div className="flex flex-col h-full w-full col-span-auto row-span-auto items-center justify-center">

													<Image
														className="opacity-80"
														src="/empty-beaker.png"
														width={85.1}
														height={192.5}
													/>
													<p className="mt-6 font-mono text-center text-sky-950/80">
														Looks pretty empty
														<br />
														{' '}
														around here....
													</p>

												</div>

											) : ( 
													
												state.items.map((cartItem, index) => {
													return <CartListItem key={index} cartItemObj={cartItem} />
												}
											
											))}

										</div>

										<p className='font-mono text-xl text-sky-300'>
											Total Cost:
											{Formatter.format(parseFloat(state.cartTotal))}
										</p>

										<div>

											<button
												type='submit'
												onClick={() => {
													router.push('/cart/checkout');
												}}
												>Checkout</button>

										</div>

									</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</div>
			</Dialog>
		</Transition.Root>
	);

};

export default CartModal;
