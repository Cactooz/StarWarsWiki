import { observer } from 'mobx-react-lite';
import ProfileView from '../views/profileView.jsx';
import { useLocation } from 'react-router-dom';
import BrowseView from '../views/browseView.jsx';
import FriendSidebarView from '../views/friendSidebarView.jsx';
import {
	findUser,
	removeFriendDB,
	removeFriendRequest,
	removeRequest,
} from '../models/firebaseModel.js';
import Vortex from '../components/Vortex.jsx';
import NoPermissionView from '../views/noPermissionView.jsx';
import ErrorView from '../views/errorView.jsx';
import { useEffect } from 'react';
import Toastify from '../components/Toastify.jsx';
import { toast } from 'react-toastify';

export default observer(function ProfilePresenter(props) {
	function doAddACB(card) {
		props.model.addToFavorites(card);
	}

	function doRemoveACB(card) {
		props.model.removeFromFavorites(card);
	}

	async function addFriend(event) {
		if (event.key === 'Enter') {
			await findUser(event.target.value);
			if (event.target.value === props.model.user.uid) {
				toast.error('That is your ID. Add a friend instead!');
			} else if (props.model.friends.find((element) => element === event.target.value)) {
				toast.error(`You and ${props.model.users[event.target.value]} are already friends!`);
			} else if (props.model.sentRequests.find((element) => element === event.target.value))
				toast.error(
					`You have already sent a friend request to ${props.model.users[event.target.value]}!`,
				);
			else if (props.model.friendRequests.find((element) => element === event.target.value)) {
				// you have a friend request from that user already
				acceptFriend(event.target.value);
			} else if (props.model.isUser) {
				props.model.addFriend(event.target.value);
				props.model.addRequest(event.target.value);
				toast.success(`Friend request sent to ${props.model.users[event.target.value]}.`);
			} else {
				toast.error('There are no users with that ID, try again!');
			}
		}
	}

	function showID() {
		props.model.setId(true);
	}

	function hideID() {
		props.model.setId(false);
	}

	function acceptFriend(uid) {
		props.model.acceptFriendRequest(uid);
		removeRequest(uid);
		toast.success(`Added ${props.model.users[uid]} to your friends!`);
	}

	function cancelRequest(uid) {
		props.model.removeSentRequest(uid);
		removeFriendRequest(uid);
	}

	function declineFriend(uid) {
		props.model.removeFriendRequest(uid);
		removeRequest(uid);
	}

	function removeFriend(uid) {
		props.model.removeFriend(uid);
		removeFriendDB(uid);
	}

	function checkNames(id) {
		return props.model.users[id];
	}

	const location = useLocation();
	let site = location.pathname.split('/')[2];
	useEffect(() => {
		findUser(site);
	}, []);
	if (props.model.user === undefined) {
		return (
			<>
				<ProfileView user={props.model.user} inAnimation={props.model.inAnimation} />
			</>
		);
	} else if (props.model.user) {
		if (site) {
			if (props.model.loadingFriends) {
				return <Vortex />;
			} else if (props.model.friends.find((element) => element === site)) {
				return (
					<>
						{defaultRender()}
						<ProfileView user={props.model.users[site]} inAnimation={props.model.inAnimation} />
						{props.model.friendFavorites[site]?.length ? (
							!props.model.loadingFriendsFav ? (
								<BrowseView
									browseResult={props.model.friendFavorites[site]}
									doAdd={doAddACB}
									doRemove={doRemoveACB}
									fav={props.model.favorites}
									auth={props.model.user}
									path={location.pathname}
									inAnimation={props.model.inAnimation}
								/>
							) : (
								<Vortex />
							)
						) : (
							props.model.users[site] + ' does not have any favorites yet...'
						)}
						<Toastify />
					</>
				);
			} else if (
				props.model.friends.find((element) => element !== site) ||
				!props.model.friends.length ||
				props.model.loadingFriends
			) {
				if (!props.model.gettingUser) {
					if (window.location.pathname.split('/')[2]) {
						if (props.model.users[site]) {
							return <NoPermissionView />;
						} else return <ErrorView />;
					}
				}
			}
		} else
			return (
				<>
					{defaultRender()}
					{props.model.loadingFavs !== undefined && props.model.user.displayName ? (
						<>
							<ProfileView user={props.model.user} inAnimation={props.model.inAnimation} />
							{props.model.favorites.length ? (
								<BrowseView
									browseResult={props.model.favorites}
									doAdd={doAddACB}
									doRemove={doRemoveACB}
									fav={props.model.favorites}
									auth={props.model.user}
									path={location.pathname}
									inAnimation={props.model.inAnimation}
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
	}

	function defaultRender() {
		if (
			props.model.friends.map(checkNames) &&
			props.model.friendRequests.map(checkNames) &&
			props.model.sentRequests.map(checkNames)
		)
			return (
				<>
					<FriendSidebarView
						friends={props.model.friends}
						names={props.model.users}
						addfriend={addFriend}
						showID={showID}
						hideID={hideID}
						shouldShowId={props.model.showId}
						yourID={props.model.user.uid}
						friendRequest={props.model.friendRequests}
						acceptFriend={acceptFriend}
						declineFriend={declineFriend}
						sentRequests={props.model.sentRequests}
						cancelFriend={cancelRequest}
						removeFriend={removeFriend}
						site={site}
					/>
				</>
			);
		else {
			return <Vortex />;
		}
	}
});
