import Logo from '../logo'
import NavLink from '../navLink'

const Footer = () => (
        
        <footer className='flex flex-col h-72 bg-gradient-to-b from-slate-950 to-indigo-950 items-center justify-center'>
            <Logo scale={2} className='justify-center !mr-0'/>
            <nav className='w-9/12 mx-auto my-10 flex justify-center select-none items-center border-b-slate-950 mb-5'>
                <NavLink href='/about'>About</NavLink>
                <NavLink href='/molecules'>Molecules</NavLink>
                <NavLink href='/molecules'>Terms of Service</NavLink>
                <NavLink href='/molecules'>News & Updates</NavLink>
            </nav>
        </footer>

    )

export default Footer