import React, { useState } from 'react';
import { Link } from 'gatsby';
// import mobileMenu from '../../static/mobile-menu.js';
import { AiOutlineMenu } from '@react-icons/all-files/ai/AiOutlineMenu';
import { AiOutlineClose } from '@react-icons/all-files/ai/AiOutlineClose';

function Navbar() {
	const [isMenuShown, setIsMenuShown] = useState(false);
	return (
		<nav className="navbar-container flex justify-end container py-4 px-4">
			{!isMenuShown && (
				<button
					className="md:hidden text-white text-3xl"
					onClick={() => setIsMenuShown(true)}
				>
					<AiOutlineMenu />
				</button>
			)}

			{isMenuShown && (
				<button
					className="md:hidden text-white text-3xl z-50"
					onClick={() => setIsMenuShown(false)}
				>
					<AiOutlineClose />
				</button>
			)}

			<ul
				className={`${
					isMenuShown ? `absolute` : `hidden`
				} top-0 left-0 w-full h-screen text-right p-4 bg-[#14161c] gap-10 md:flex md:top-[unset] md:left-[unset] md:w-auto md:h-auto md:gap-8 justify-end`}
			>
				<div className="container flex flex-col h-full justify-end gap-10 text-2xl md:flex-row md:h-auto md:gap-8 md:text-lg">
					<li>
						<Link to="/">Home</Link>
					</li>
					<li>
						<a href="https://blog.fullstack.chat/" target="_blank">
							Blog
						</a>
					</li>
					<li>
						<Link to="#about">About</Link>
					</li>
					<li>
						<Link to="#rules">Join Us</Link>
					</li>
				</div>
			</ul>
		</nav>
	);
}

export default Navbar;
