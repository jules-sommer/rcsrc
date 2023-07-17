'use client'

import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import Link from 'next/link';
import { slugify } from '../../_utils/utils';

import Image from 'next/image';

import { isClientAtom } from '../../_providers/isClientProvider';
import { useAtomValue, useAtom } from 'jotai';

import { useUserData } from '../../_providers/JotaiProvider'

const classNames = (...classes) => classes.filter(Boolean).join(' ');

const UserSettingsDropdown = () => {

    const { authenticated, user } = useUserData();
	const isClient = useAtomValue(isClientAtom);

	if (!isClient || !authenticated) {

		return null;

	} else {

		return (

			<Menu as="div" className="relative inline-block text-left">

				<div>

					<Menu.Button className="inline-flex items-center justify-center flex-grow-0 mr-3">

						<Image
							src={`https://api.dicebear.com/6.x/bottts/png?seed=${slugify(user.email.split('@')[0])}}`}
							width={50}
							height={50}
							className='mask mask-hexagon bg-accent mx-4 opacity-75 hover:opacity-100 hover:transform hover:scale-110 transition-all duration-200 ease-in-out'
							alt={''}
						/>
								
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
											signOut({ callbackUrl: '/' })
										}}
										className={classNames(
											active ? 'bg-red-200 text-red-900' : 'text-red-700',
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

}

export default UserSettingsDropdown;