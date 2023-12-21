import { slide as Menu } from 'react-burger-menu';
import { Link } from 'react-router-dom';
import { useState } from 'react';

import '../style/burgermenu.scss';

export default function HamburgerView() {
	return (
		<Menu>
			<Link to='/characters'>Characters</Link>
			<Link to='/vehicles'>Vehicles</Link>
			<Link to='/locations'>Locations</Link>
		</Menu>
	);
}
