import React, { useState } from 'react';

type Props = {
	href: string;
	textToShow: string;
};

function ExternalLink({ href, textToShow }: Props) {
	const [isHovered, setIsHovered] = useState(false);
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
		>
			{textToShow}
		</a>
	);
}

export default ExternalLink;
