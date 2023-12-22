import { Link } from 'react-router-dom';
import SignInButton from '../components/SignInButton.jsx';
import GoToProfile from '../components/GoToProfile.jsx';
import Logo from '../../assets/images/sww-logo.svg';

export default function NavbarView(props) {
	function browseDataACB(event) {
		props.onClickHandler(event.target.innerText.toLowerCase());
	}

	return (
		<nav id='nav'>
			{props.page === '/' ? <img src={Logo} alt='Star Wars Wiki logo of green Yoda with red Christmas hat' /> :
				<Link to='/' replace={props.inAnimation ? true : false}>
					<img src={Logo} alt='Star Wars Wiki logo of green Yoda with red Christmas hat' />
				</Link>}
			{props.page === '/characters' ? <p className='current-page'>Characters</p> :
				<Link to='/characters' replace={props.inAnimation ? true : false} onClick={browseDataACB}>
					<p>Characters</p>
				</Link>}
			{props.page === '/vehicles' ? <p className='current-page'>Vehicles</p> :
				<Link to='/vehicles' replace={props.inAnimation ? true : false} onClick={browseDataACB}>
					<p>Vehicles</p>
				</Link>}
			{props.page === '/locations' ? <p className='current-page'>Locations</p> :
				<Link to='/locations' replace={props.inAnimation ? true : false} onClick={browseDataACB}>
					<p>Locations</p>
				</Link>}
			{props.user ? <GoToProfile inAnimation={props.inAnimation} page={props.page} /> : <SignInButton />}
		</nav>
	);
}
