import { Link } from 'react-router-dom';

export default function GoToProfile(props) {
	if (props.page === '/profile')
		return <p className='currentPage'>Profile</p>;
	else
		return (
			<Link
				to={'/profile'}
				replace={props.inAnimation ? true : false}
				onClick={props.onClickHandler ? props.onClickHandler : () => {
				}}>
				<p>Profile</p>
			</Link>
		);
}
