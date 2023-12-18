import { observer } from "mobx-react-lite";
import ProfileView from "../views/profileView.jsx";
import { Link, useLocation } from "react-router-dom";
import BrowseView from "../views/browseView.jsx";
import FriendSidebarView from "../views/friendSidebarView.jsx";
import { findUser, removeFriendDB, removeFriendRequest, removeRequest } from "../models/firebaseModel.js";
import ErrorView from "../views/errorView.jsx";
import Vortex from "../components/Vortex.jsx"

export default observer(
	function ProfilePresenter(props) {
		function doAddACB(card) {
			props.model.addToFavorites(card)
		}

		function doRemoveACB(card) {
			props.model.removeFromFavorites(card)
		}

		async function addFriend(event) {
			props.model.setCustomMessage(undefined);
			if (event.key === 'Enter') {
				await findUser(event.target.value)
				if (event.target.value === props.model.user.uid)
					props.model.setCustomMessage("That is your ID!");
				else if (props.model.friends.find((element) => element === event.target.value))
					props.model.setCustomMessage("You are Friends!")
				else if (props.model.sentRequests.find((element) => element === event.target.value))
					props.model.setCustomMessage("Wait for your friend to respond")
				else if (props.model.friendRequests.find((element) => element === event.target.value))
					props.model.setCustomMessage("Add Friend by Accepting their Friend Request")
				else if (props.model.isUser) {
					props.model.addFriend(event.target.value)
					props.model.addRequest(event.target.value)
					props.model.setCustomMessage("Friend Request Sent!")
				} else {
					props.model.setCustomMessage("Wrong ID!")
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
			props.model.acceptFriendRequest(uid);
			removeRequest(uid)
		}

		function cancelRequest(uid) {
			props.model.removeSentRequest(uid);
			removeFriendRequest(uid);
		}

		function declineFriend(uid) {
			props.model.removeFriendRequest(uid);
			removeRequest(uid)
		}

		function removeFriend(uid) {
			props.model.removeFriend(uid)
			removeFriendDB(uid)
		}

		function checkNames(id) {
			return props.model.users[id]
		}

		if (props.model.user === undefined)
			return (
				<>
					<h2 >You are not logged in. Sign in above.</h2 >
					<Link to={"/"} >
						<h2 >Return to home!</h2 >
					</Link >
				</>
			)
		if (props.model.user) {
			const site = useLocation().pathname.split("/")[2];
			if (site) {
				if (props.model.friends.find((element) => element === site)) {
					return (
						<>
							{defaultRender()}
							<ProfileView currentUser={props.model.users[site]} />
							{props.model.friendFavorites[site]?.length ?
								<BrowseView browseResult={props.model.friendFavorites[site]} doAdd={doAddACB} doRemove={doRemoveACB}
								            fav={props.model.favorites}
								            auth={props.model.user} /> : site + " does not have any favorites yet..."}
						</>
					);
				} else {
					return <ErrorView />
				}
			} else
				return (
					<>
						{defaultRender()}
						<ProfileView currentUser={props.model.user} />
						{props.model.favorites.length ?
							<BrowseView browseResult={props.model.favorites} doAdd={doAddACB} doRemove={doRemoveACB}
							            fav={props.model.favorites}
							            auth={props.model.user} /> : "You have not added any favorites yet..."}
					</>
				);
		}

		function defaultRender() {
			if (props.model.friends.map(checkNames))
				return (
					<>
						<FriendSidebarView friends={props.model.friends} names={props.model.users} addfriend={addFriend}
						                   showID={showID} hideID={hideID}
						                   shouldShowId={props.model.showId} yourID={props.model.user.uid}
						                   customMessage={props.model.customMessage} friendRequest={props.model.friendRequests}
						                   acceptFriend={acceptFriend} declineFriend={declineFriend}
						                   sentRequests={props.model.sentRequests} cancelFriend={cancelRequest}
						                   removeFriend={removeFriend} />
					</>
				)
			else {
				return <Vortex />
			}
		}
	}
);
