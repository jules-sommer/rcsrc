import NavLink from "../navLink"
import Logo from "../logo"
import Link from "next/link"
import HeaderCartIcon from './headerCartIcon';

const Header = () => {

    return (

        <header className='p-5 bg-sky-900/60 z-50 left-0 right-0 flex justify-between items-center backdrop-blur-md fixed'>
            <div className='w-9/12 mx-auto flex justify-between content-center'>
                <Link href='/' className="flex items-center justify-center">
                <div className='flex items-center justify-center'>
                    <Logo />
                    <h1 className='font-mono subpixel-antialiased text-slate-300 select-none font-bold text-2xl'>rcsrc canada</h1>
                </div>
                </Link>

                <nav className='flex justify-end select-none items-center'>
                    <NavLink href='/about'>About</NavLink>
                    <NavLink href='/molecules'>Molecules</NavLink>
                </nav>

                <HeaderCartIcon />

            </div>
        </header>

    )

}

export default Header;