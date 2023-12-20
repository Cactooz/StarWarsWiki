import { slide as Menu } from 'react-burger-menu';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function HamburgerView() {
	return (
		<Menu>
			<Link to='/characters'>Characters</Link>
		</Menu>
	);
}
