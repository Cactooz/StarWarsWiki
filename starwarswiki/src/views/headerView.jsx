import { Link } from 'react-router-dom';

export default function HeaderView() {
	return (
		<header className='header'>
			<Link to='/'>
				<p>Home</p>
			</Link>
			<Link to='/characters'>
				<p>Characters</p>
			</Link>
			<Link to='/vehicles'>
				<p>Vehicles</p>
			</Link>
			<Link to='/locations'>
				<p>Locations</p>
			</Link>
		</header>
	);
}
