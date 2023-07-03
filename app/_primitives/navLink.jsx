/* eslint-disable no-undef */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/require-default-props */
import Link from 'next/link';

const NavLink = ({ href, children, classes = false }) => <Link className={`${classes} mr-10 text-slate-300 hover:text-slate-50 hover:drop-shadow-light-xl transition-all hover:translate-y-[-1.5px] font-mono subpixel-antialiased font-medium select-none leading-none grow-0`} href={href}>{children}</Link>;

export default NavLink;
