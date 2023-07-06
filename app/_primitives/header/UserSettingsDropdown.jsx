'use client'

import { Fragment } from 'react'
import { useAuthenticator } from '@aws-amplify/ui-react'
import { Menu, Transition } from '@headlessui/react'
import { View, Button, VisuallyHidden } from "@aws-amplify/ui-react";
import Link from 'next/link';
import { useUserInfo } from '../../_providers/useUserInfo'

import { signIn, signOut } from 'next-auth/react';

import { setLatestAuthEvent, signUserOut } from "../../_slices/_auth";
import { useDispatch } from "react-redux";

const classNames = (...classes) => classes.filter(Boolean).join(' ');

const UserSettingsDropdown = () => {

	return (

		<Menu as="div" className="relative inline-block text-left">

			<div>
				
				<Menu.Button className="inline-flex items-center justify-center flex-grow-0">
					<button
						className="font-mono text-sky-200 ml-3 p-2 border-2 border-sky-200 rounded-md h-min "
					>
						<span className="material-symbols-rounded !inline-flex items-center justify-center py-4 px-2 pr-4 w-2 h-2 text-lg">
							account_circle
						</span>
						<span className="material-symbols-rounded !inline-flex items-center justify-center py-4 px-2 w-2 h-2 text-lg">
							arrow_drop_down
						</span>
					</button>
				</Menu.Button>
				
			</div>

			<Transition
				as={Fragment}
				enter="transition ease-out duration-100"
				enterFrom="transform opacity-0 scale-95"
				enterTo="transform opacity-100 scale-100"
				leave="transition ease-in duration-75"
				leaveFrom="transform opacity-100 scale-100"
				leaveTo="transform opacity-0 scale-95"
			>

				<Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
			
					<div className="py-1">
			
						<Menu.Item>
							{({ active }) => (
							<Link
								href="/account"
								className={classNames(
								active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
								'block px-4 py-2 text-sm'
								)}
							>
								My Account
							</Link>
							)}
						</Menu.Item>

					</div>
					
					<div className="py-1">
						
						<Menu.Item>
							{({ active }) => (
							<button
								onClick={() => {
									signOut();
									useDispatch(signUserOut());
									useDispatch(setLatestAuthEvent({
										type: 'signOut',
										timestamp: Date.now(),
									}))	
								}}
								className={classNames(
								active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
								'block px-4 py-2 text-sm w-full text-left'
								)}
							>
								Sign Out
							</button>
							)}
						</Menu.Item>

					</div>

				</Menu.Items>

			</Transition>

		</Menu>
		
	)

}

export default UserSettingsDropdown;