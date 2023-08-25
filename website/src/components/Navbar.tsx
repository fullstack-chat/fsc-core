import * as React from 'react';

function Navbar() {
	return (
		<nav className="navbar-container">
			<ul className="navbar flex justify-end gap-4">
				<li className="navitem">
					<a href="#" className="navlink">
						Home
					</a>
				</li>
				<li className="navitem">
					<a href="#" className="navlink">
						About
					</a>
				</li>
				<li className="navitem">
					<a href="#" className="navlink">
						Join Us
					</a>
				</li>
			</ul>
		</nav>
	);
}

export default Navbar;
