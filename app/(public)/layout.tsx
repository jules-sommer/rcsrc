import { Header } from '@ui/header/Header';
import { Footer } from '@ui/footer/Footer';
import '../../styles/Home.module.css';
import '../../styles/globals.css';
import 'material-symbols';

import chalk from 'chalk';
require('better-logging')(console);

import { JotaiProvider } from "@providers/JotaiProvider";

import { UseNextAuth } from '@providers/UseNextAuth';
import { ViewSession } from "@atoms/viewSession"
import { SessionInitializeWrapper } from "@providers/SessionInitializeWrapper"
import { Suspense } from 'react';
import { ClientProvider } from '@providers/isClientProvider';

export const metadata = {
	title: 'RCSrc Canada',
	description: 'Leader in novel research chemicals and APIs.',
}

const RootLayout = ({
	children,
	cart,
	...pageProps
} : { children: React.ReactNode, cart: React.ReactNode }) => {

	return (

		<html lang="en">

			<body>

				<JotaiProvider>

					<UseNextAuth>

						<SessionInitializeWrapper />

						<ViewSession>

              <ClientProvider>

								<Header
									size='full'
									showUser={true}
									showCart={true}
									homeLink={false}
									isFixed={true}
								/>

								<main className='pt-[86px] bg-slate-950' {...pageProps}>
									{cart}
									{children}
								</main>

								<Footer />

              </ClientProvider>

						</ViewSession>

					</UseNextAuth>

				</JotaiProvider>

			</body>

		</html>

	)

}

export default RootLayout;
