import { observer } from 'mobx-react-lite';
import ProfileView from '../views/profileView.jsx';
import BrowseView from '../views/browseView.jsx';
import Vortex from '../components/Vortex.jsx';

export default observer(function ProfilePresenter(props) {
	function doAddACB(card) {
		props.model.addToFavorites(card);
	}

	function doRemoveACB(card) {
		props.model.removeFromFavorites(card);
	}
	if (props.model.user === undefined) {
		return <ProfileView user={props.model.user} />;
	} else if (props.model.user)
		return (
			<>
				{props.model.loadingFavs !== undefined && props.model.user.displayName ? (
					<>
						<ProfileView name={props.model.user.displayName} user={props.model.user} />
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
