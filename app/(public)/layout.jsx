import Header from '../_primitives/header/header';
import Footer from '../_primitives/footer/footer';
import styles from '../../styles/Home.module.css';
import '../../styles/globals.css';
import 'material-symbols';

import chalk from 'chalk';
require('better-logging')(console);

import CartContextProvider from '../_providers/cartProvider';
import { ClientProvider, useIsClient } from '../_providers/isClientProvider';

import UseReduxStore from '../_providers/UseReduxStore';

import { UseNextAuth } from '../_providers/UseNextAuth';
import { SessionProvider } from 'next-auth/react';

import UseAwsAuth from '../_providers/useAwsAuth';

import { Amplify } from 'aws-amplify';
import AwsExports from '../aws-exports';

Amplify.configure({ ...AwsExports, ssr: true });

export const metadata = {
	title: 'RCSrc Canada',
	description: 'Leader in novel research chemicals and APIs.',
}

export default function RootLayout({ children, cart, ...pageProps }) {

	return (
	
		<html lang="en">

			<body>
				
				<UseReduxStore>

					<UseNextAuth>

						<UseAwsAuth>

							<ClientProvider>

								<CartContextProvider>

									<Header />

									{cart}

									<main className='pt-[86px] bg-slate-950'>{children}</main>

									<Footer />
									
								</CartContextProvider>

							</ClientProvider>

						</UseAwsAuth>

					</UseNextAuth>

				</UseReduxStore>

			</body>
	
		</html>

	)

}
