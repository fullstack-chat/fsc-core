import React, { useState } from 'react';
import { Link } from 'gatsby';
// import mobileMenu from '../../static/mobile-menu.js';
import { GiHamburgerMenu } from '@react-icons/all-files/gi/GiHamburgerMenu';
import { HiMiniXMark } from '@react-icons/all-files/gi/HiMiniXMark';

function Navbar() {
	const [isExpanded, toggleExpansion] = useState(false);
	return (
		<nav className="navbar-container flex justify-end container py-4 px-4">
			{/* Shown on small screens only */}
			<button
				id="hamburger-menu-button"
				className="md:hidden text-white text-4xl"
				onClick={() => toggleExpansion(!isExpanded)}
			>
				<GiHamburgerMenu />
			</button>
			<button
				id="hamburger-menu-button-close"
				className="md:hidden text-white text-4xl"
				onClick={() => toggleExpansion(!isExpanded)}
			>
				<HiMiniXMark />
			</button>
			<ul
				className={`${
					isExpanded ? `block` : `hidden`
				} md:flex justify-end gap-4`}
			>
				<li className="navitem">
					<Link to="/">Home</Link>
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
