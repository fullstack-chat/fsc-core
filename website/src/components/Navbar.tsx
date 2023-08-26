import * as React from 'react';
import { Link } from 'gatsby';
// import mobileMenu from '../../static/mobile-menu.js';
import { GiHamburgerMenu } from '@react-icons/all-files/gi/GiHamburgerMenu';

function Navbar() {
	return (
		<nav className="navbar-container flex justify-end container py-4">
			<button
				id="hamburger-menu-button"
				className="md:hidden text-white text-4xl"
			>
				<GiHamburgerMenu />
			</button>
			<ul className="hidden md:flex justify-end gap-4">
				<li className="navitem">
					<Link to="index.tsx">Home</Link>
				</li>
				<li className="navitem">
					<a href="https://blog.fullstack.chat/" target="_blank">
						Blog
					</a>
				</li>
				<li className="navitem">
					<Link to="#about">About</Link>
				</li>
				<li className="navitem">
					<Link to="#rules">Join Us</Link>
				</li>
			</ul>
		</nav>
	);
}

export default Navbar;
