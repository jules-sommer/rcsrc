import Header from '../_primitives/header/header';
import Footer from '../_primitives/footer/footer';
import styles from '../../styles/Home.module.css';
import '../../styles/globals.css';
import 'material-symbols';

import chalk from 'chalk';
require('better-logging')(console);

import CartContextProvider from '../_providers/cartProvider';
import { ClientProvider, useIsClient } from '../_providers/isClientProvider';

import { UseNextAuth } from '../_providers/UseNextAuth';
import WithReduxState from '../_providers/WithReduxProvider';

export const metadata = {
	title: 'RCSrc Canada',
	description: 'Leader in novel research chemicals and APIs.',
}

const RootLayout = ({ children, cart, ...pageProps }) => {

	return (
	
		<html lang="en">

			<body>


				<WithReduxState>

					<UseNextAuth>

						<ClientProvider>

							<CartContextProvider>

								<Header />

								{cart}

								<main className='pt-[86px] bg-slate-950'>{children}</main>

								<Footer />
								
							</CartContextProvider>

						</ClientProvider>

					</UseNextAuth>

				</WithReduxState>

			</body>
	
		</html>

	)

}

export default RootLayout;