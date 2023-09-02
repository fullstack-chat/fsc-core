import React, { useState } from 'react';

type Props = {
	heading: string;
};

function H1({ heading }: Props) {
	return <h1 className="text-4xl pb-3 mb-2">{heading}</h1>;
}

export default H1;
