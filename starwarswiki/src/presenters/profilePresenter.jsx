import { observer } from 'mobx-react-lite';
import ProfileView from '../views/profileView.jsx';
import { Link } from 'react-router-dom';
import BrowseView from '../views/browseView.jsx';

export default observer(function ProfilePresenter(props) {
	function doAddACB(card) {
		props.model.addToFavorites(card);
	}

	function doRemoveACB(card) {
		props.model.removeFromFavorites(card);
	}

	if (props.model.user === undefined)
		return (
			<>
				<h2>You are not logged in. Sign in above.</h2>
				<Link to={'/'}>
					<h2>Return to home!</h2>
				</Link>
			</>
		);
	if (props.model.user)
		return (
			<>
				<ProfileView currentUser={props.model.user} favorites={props.model.favorites} />
				{props.model.favorites.length ? (
					<BrowseView
						browseResult={props.model.favorites}
						doAdd={doAddACB}
						doRemove={doRemoveACB}
						fav={props.model.favorites}
						auth={props.model.user}
					/>
				) : (
					'You have not added any favorites yet...'
				)}
			</>
		);
});
