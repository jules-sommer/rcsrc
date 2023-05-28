import Header from './header/header'
import Footer from './footer/footer'
import styles from '../styles/Home.module.css'
import '../styles/globals.css'
import 'material-icons/iconfont/material-icons.css';
import 'material-symbols';

import CartContextProvider from './cartProvider';

import LogRocket from 'logrocket';
LogRocket.init('llbux5/rcsrc-canada');

export const metadata = {
  title: 'RCSrc Canada',
  description: 'Leader in novel research chemicals and APIs.',
}

export default function RootLayout({ children, cart }) {

  return (
  <html lang="en">
    <body>
      <CartContextProvider>
        <Header />
          {cart}
          <main className='pt-[72px] bg-indigo-950'>{children}</main>
        <Footer />
      </CartContextProvider>
    </body>
  </html>
  )
}
