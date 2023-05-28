/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/react-in-jsx-scope */

'use client';

import {
	Fragment, useContext,
} from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useRouter, usePathname } from 'next/navigation';
import { XMarkIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { CartStateContext, CartDispatchContext } from '../../cartProvider';
import CartListItem from './cartListItem';

const CartModal = () => {

	const router = useRouter();
	const pathname = usePathname();

	const state = useContext(CartStateContext);
	const cartDispatch = useContext(CartDispatchContext);

	console.log(`CART STATE FROM THE EYES OF CART PAGE: ${JSON.stringify(state, undefined, 3)}`);

	const setOpenState = (isOpen) => {

		console.log(`CURRENT PATHNAME: ${pathname}, RETURN URL: ${state.isOpen.returnUrl}`);
		router.push(state.isOpen.returnUrl);

		cartDispatch({ type: 'UPDATE_CART_STATE', isOpen });

	};

	// eslint-disable-next-line react/destructuring-assignment
	const cartItems = state.items;

	console.log(cartItems);

	return (
		<Transition.Root
			show={state.isOpen.state}
			appear
			as={Fragment}
			afterLeave={() => {

				setOpenState(false);

			}}
		>
			<Dialog
				as="div"
				className="relative z-50"
				onClose={() => {

					setOpenState(false);

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

													setOpenState(false);

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
										<div className="relative mt-6 grid w-full px-4 sm:px-6">

											{state.isEmpty ? (

											// CART IS EMPTY, SHOW AN EMPTY CART DIALOGUE

												<div className="flex flex-col h-full w-full items-center justify-center">

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

											) : cartItems.forEach((thisItem) => {

												console.log(`FROM CART PAGE: var thisItem: ${JSON.stringify(thisItem, undefined, 4)}`);

												return (<CartListItem item={thisItem} />);

											})}
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
