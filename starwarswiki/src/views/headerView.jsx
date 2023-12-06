import {Link} from 'react-router-dom';
import SignInButton from "../components/SignInButton.jsx";
import SignOutButton from "../components/SignOutButton.jsx";

export default function HeaderView(props) {
	function browseDataACB(event) {
		props.onClickHandler(event.target.innerText.toLowerCase());
	}

	return (
		<header className='header'>
			<Link to='/'>
				<p>Home</p>
			</Link>
			<Link to='/characters' onClick={browseDataACB}>
				<p>Characters</p>
			</Link>
			<Link to='/vehicles' onClick={browseDataACB}>
				<p>Vehicles</p>
			</Link>
			<Link to='/locations' onClick={browseDataACB}>
				<p>Locations</p>
			</Link>
			{props.user ? <SignOutButton/> : <SignInButton/>}
		</header>
	);
}
