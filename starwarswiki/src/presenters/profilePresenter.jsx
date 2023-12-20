import { observer } from "mobx-react-lite";
import ProfileView from "../views/profileView.jsx";
import { useLocation } from "react-router-dom";
import BrowseView from "../views/browseView.jsx";
import FriendSidebarView from "../views/friendSidebarView.jsx";
import { findUser, removeFriendDB, removeFriendRequest, removeRequest } from "../models/firebaseModel.js";
import Vortex from "../components/Vortex.jsx"
import NoPermissionView from "../views/noPermissionView.jsx";

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

		let site = useLocation().pathname.split("/")[2];
		if (props.model.user === undefined)
			return (
				<>
					<ProfileView user={props.model.user} />
				</>
			)
		if (props.model.user) {
			if (site) {
				if (props.model.loadingFriends) {
					return <Vortex />
				} else if (props.model.friends.find((element) => element === site)) {
					return (
						<>
							{defaultRender()}
							<ProfileView user={props.model.users[site]} />
							{props.model.friendFavorites[site]?.length ? !props.model.loadingFriendsFav ?
								<BrowseView browseResult={props.model.friendFavorites[site]} doAdd={doAddACB} doRemove={doRemoveACB}
								            fav={props.model.favorites}
								            auth={props.model.user} /> :
								<Vortex /> : props.model.users[site] + " does not have any favorites yet..."}
						</>
					);
				} else if (props.model.friends.find((element) => element !== site) || !props.model.friends.length && props.model.loadingFriends) {
					if (window.location.pathname.split("/")[2]) {
						return <NoPermissionView />
					}

				}
			} else
				return (
					<>
						{defaultRender()}
						{props.model.loadingFavs !== undefined && props.model.user.displayName ? (
							<>
								<ProfileView user={props.model.user} />
								{props.model.favorites.length ? (
									<BrowseView
										browseResult={props.model.favorites}
										doAdd={doAddACB}
										doRemove={doRemoveACB}
										fav={props.model.favorites}
										auth={props.model.user}
									/>
								) : (
									<p >You have not added any favorites yet...</p >
								)}
							</>
						) : (
							<Vortex />
						)}
					</>
				);
		}

		function defaultRender() {
			if (props.model.friends.map(checkNames) && props.model.friendRequests.map(checkNames) && props.model.sentRequests.map(checkNames))
				return (
					<>
						<FriendSidebarView friends={props.model.friends} names={props.model.users} addfriend={addFriend}
						                   showID={showID} hideID={hideID}
						                   shouldShowId={props.model.showId} yourID={props.model.user.uid}
						                   customMessage={props.model.customMessage} friendRequest={props.model.friendRequests}
						                   acceptFriend={acceptFriend} declineFriend={declineFriend}
						                   sentRequests={props.model.sentRequests} cancelFriend={cancelRequest}
						                   removeFriend={removeFriend}
						                   site={site} />
					</>
				)
			else {
				return <Vortex />
			}
		}
	}
);
