import Header from '../_primitives/header/header';
import Footer from '../_primitives/footer/footer';
import styles from '../../styles/Home.module.css';
import '../../styles/globals.css';
import 'material-symbols';

import chalk from 'chalk';
require('better-logging')(console);

import CartContextProvider from '../_providers/cartProvider';
import { ClientProvider, useIsClient } from '../_providers/isClientProvider';

import UseAwsAuth from '../_providers/useAwsAuth';

import { Amplify } from 'aws-amplify';
import AwsExports from '../aws-exports';
Amplify.configure({ ...AwsExports, ssr: true });

export const metadata = {
	title: 'RCSrc Admin',
	description: 'Admin dashboard for popular research chemical supplier, RCSrc Canada.',
}

export default function RootLayout({ children }) {
    
    return (

		<html lang="en">

			<body>
				
				<UseAwsAuth>
					
					<ClientProvider>

                        <Header
                            size='condensed'
                            showCart={false}
                            showUser={true}
							homeLink={true}
							isFixed={false}
						/>
						
						<main className=' bg-slate-950'>{children}</main>
						
					</ClientProvider>

				</UseAwsAuth>
			
			</body>
	
		</html>

    )

}