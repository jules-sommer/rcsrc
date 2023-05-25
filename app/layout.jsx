import Header from './header/header'
import Footer from './footer/footer'
import styles from '../styles/Home.module.css'
import '../styles/globals.css'
import 'material-icons/iconfont/material-icons.css';

import LogRocket from 'logrocket';
LogRocket.init('llbux5/rcsrc-canada');

export const metadata = {
  title: 'RCSrc Canada',
  description: 'Leader in novel research chemicals and APIs.',
}

export default function RootLayout({ children }) {
 return (
    <html lang="en">
      <body>
        <Header />
          <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
