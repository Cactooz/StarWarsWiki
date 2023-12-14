import { observer } from "mobx-react-lite";
import ProfileView from "../views/profileView.jsx";
import { Link } from "react-router-dom";
import BrowseView from "../views/browseView.jsx";
import FriendSidebarView from "../views/friendSidebarView.jsx";
import { findUser } from "../models/firebaseModel.js";

export default observer(
	function ProfilePresenter(props) {
		function doAddACB(card) {
			props.model.addToFavorites(card)
		}

		function doRemoveACB(card) {
			props.model.removeFromFavorites(card)
		}

		async function addFriend(event) {
			if (event.key === 'Enter') {
				await findUser(event.target.value)
				if (props.model.isUser === true) {
					props.model.addFriend(event.target.value)
				} else {
					props.model.setIsUser(false)
				}
			}
		}

		function showID() {
			props.model.setId(true)
		}

		function hideID() {
			props.model.setId(false)
		}

		if (props.model.user === undefined)
			return (
				<>
					<h2>You are not logged in. Sign in above.</h2>
					<Link to={"/"}>
						<h2>Return to home!</h2>
					</Link>
				</>
			)
		if (props.model.user)
			return (
				<>
					<FriendSidebarView friends={props.model.friends} addfriend={addFriend} showID={showID} hideID={hideID}
					                   shouldShowId={props.model.showId} yourID={props.model.user.uid}
					                   isUser={props.model.isUser}/>
					<ProfileView currentUser={props.model.user} favorites={props.model.favorites}/>
					{props.model.favorites.length ?
						<BrowseView browseResult={props.model.favorites} doAdd={doAddACB} doRemove={doRemoveACB}
						            fav={props.model.favorites}
						            auth={props.model.user}/> : "You have not added any favorites yet..."}
				</>
			);
	}
);