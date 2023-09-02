import React, { useContext, useState } from 'react';
import Navbar from './Navbar';

type Props = {
	href: string;
	textToShow: string;
	onClick?: Function;
};

function ExternalLink({ href, textToShow, onClick }: Props) {
	const [isHovered, setIsHovered] = useState(false);
	const value = useContext(Navbar.state);
	const handleMouseEnter = () => {
		setIsHovered(true);
	};
	const handleMouseLeave = () => {
		setIsHovered(false);
	};

	return (
		<a
			href={`${href}`}
			target="_blank"
			rel="noopener noreferrer"
			className={`${
				isHovered ? `border-none` : `border-b-2`
			} text-white  border-solid border-sky-500`}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			// onClick={() => setIsMenuShown(false)}
		>
			{textToShow}
		</a>
	);
}

export default ExternalLink;
