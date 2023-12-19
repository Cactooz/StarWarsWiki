import { observer } from 'mobx-react-lite';
import ProfileView from '../views/profileView.jsx';
import { Link } from 'react-router-dom';
import BrowseView from '../views/browseView.jsx';
import Vortex from '../components/Vortex.jsx';

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

	let userName = props.model.user.displayName;
	if (props.model.user)
		return (
			<>
				{props.model.loadingFavs !== undefined ? (
					<>
						<ProfileView name={userName} />
						<h3>These are your favorite pages</h3>
						{props.model.favorites.length ? (
							<BrowseView
								browseResult={props.model.favorites}
								doAdd={doAddACB}
								doRemove={doRemoveACB}
								fav={props.model.favorites}
								auth={props.model.user}
							/>
						) : (
							<p>You have not added any favorites yet...</p>
						)}
					</>
				) : (
					<Vortex />
				)}
			</>
		);
});
