import { observer } from "mobx-react-lite";
import ProfileView from "../views/profileView.jsx";
import { Link, useLocation } from "react-router-dom";
import BrowseView from "../views/browseView.jsx";
import FriendSidebarView from "../views/friendSidebarView.jsx";
import { findUser } from "../models/firebaseModel.js";
import ErrorView from "../views/errorView.jsx";

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
				if (event.target.value !== props.model.user.uid) {
					await findUser(event.target.value)
					if (props.model.isUser === true) {
						props.model.addFriend(event.target.value)
					} else {
						props.model.setIsUser(false)
					}
				} else {
					props.model.setIsUser("self");
				}
			}
		}

		function showID() {
			props.model.setId(true)
		}

		function hideID() {
			props.model.setId(false)
		}

		function acceptFriend(uid) {
			model.acceptFriendRequest(uid);
		}

		function declineFriend(uid) {
			model.removeFriendRequest(uid);
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
		if (props.model.user) {
			const site = useLocation().pathname.split("/")[2];
			console.log(site)
			if (site) {
				if (props.model.friends.find((element) => element === site)) {

					return (
						<>
							<FriendSidebarView friends={props.model.friends} addfriend={addFriend} showID={showID} hideID={hideID}
							                   shouldShowId={props.model.showId} yourID={props.model.user.uid}
							                   isUser={props.model.isUser} friendRequest={props.model.friendRequests}
							                   acceptFriend={acceptFriend} declineFriend={declineFriend}/>
							<ProfileView currentUser={""} favorites={props.model.friendFavorites}/>
							{props.model.favorites.length ?
								<BrowseView browseResult={props.model.friendFavorites} doAdd={doAddACB} doRemove={doRemoveACB}
								            fav={props.model.favorites}
								            auth={props.model.user}/> : "You have not added any favorites yet..."}
						</>
					);
				} else {
					return <ErrorView/>
				}
			} else
				return (
					<>
						<FriendSidebarView friends={props.model.friends} addfriend={addFriend} showID={showID} hideID={hideID}
						                   shouldShowId={props.model.showId} yourID={props.model.user.uid}
						                   isUser={props.model.isUser} friendRequest={props.model.friendRequests}
						                   acceptFriend={acceptFriend} declineFriend={declineFriend}/>
						<ProfileView currentUser={props.model.user} favorites={props.model.favorites}/>
						{props.model.favorites.length ?
							<BrowseView browseResult={props.model.favorites} doAdd={doAddACB} doRemove={doRemoveACB}
							            fav={props.model.favorites}
							            auth={props.model.user}/> : "You have not added any favorites yet..."}
					</>
				);
		}
	}
);
