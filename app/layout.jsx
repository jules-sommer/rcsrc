import Header from './header/header'
import Footer from './footer/footer'
import styles from '../styles/Home.module.css'
import '../styles/globals.css'
import 'material-symbols';

import CartContextProvider from './cartProvider';
import { ClientProvider, useIsClient } from './isClientProvider';

import UseAwsAuth from './useAwsAuth';

import { Amplify } from 'aws-amplify';
import awsExports from './aws-exports';
Amplify.configure({ ...awsExports, ssr: true });

import ShowGlobalState from './ShowGlobalState';

export const metadata = {
	title: 'RCSrc Canada',
	description: 'Leader in novel research chemicals and APIs.',
}

export default function RootLayout({ children, cart }) {

	return (
	
		<html lang="en">

			<body>
				
				<UseAwsAuth>
					<ClientProvider>
						<CartContextProvider>
								<Header />

								{cart}

								<main className='pt-[86px] bg-slate-950'>{children}</main>

								{process.env.IS_DEVELOPMENT === true ? <ShowGlobalState /> : null}

								<Footer />
						</CartContextProvider>
					</ClientProvider>
				</UseAwsAuth>
			
			</body>
	
		</html>

	)

}
