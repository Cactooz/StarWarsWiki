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
import { toast } from 'react-toastify';

export default observer(function ProfilePresenter(props) {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

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
		toast.success(`Cancelled friend request to ${props.model.users[uid]}.`);
	}

	function declineFriend(uid) {
		props.model.removeFriendRequest(uid);
		removeRequest(uid);
		toast.success(`Declined friend request from ${props.model.users[uid]}.`);
	}

	function removeFriend(uid) {
		props.model.removeFriend(uid);
		removeFriendDB(uid);
		toast.success(`Removed ${props.model.users[uid]} from friend list.`);
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
		return <ProfileView user={props.model.user} inAnimation={props.model.inAnimation} />;
	} else if (props.model.user) {
		if (site) {
			if (props.model.loadingFriends) {
				return <Vortex />;
			} else if (props.model.friends.find((element) => element === site)) {
				return (
					<div className='profile-view'>
						<section className='profile'>
							<ProfileView user={props.model.users[site]} inAnimation={props.model.inAnimation} />
							<section className='favorites'>
								{props.model.friendFavorites[site]?.length ? (
									!props.model.loadingFriendsFav ? (
										<>
											<h3>{'Their favorites'}</h3>
											<BrowseView
												browseResult={props.model.friendFavorites[site]}
												doAdd={doAddACB}
												doRemove={doRemoveACB}
												fav={props.model.favorites}
												auth={props.model.user}
												path={location.pathname}
												inAnimation={props.model.inAnimation}
												maxFavorites={props.model.maxFavorites}
											/>
										</>
									) : (
										<Vortex />
									)
								) : (
									<p>They do not have any favorites yet...</p>
								)}
							</section>
						</section>
						{defaultRender()}
					</div>
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
					{props.model.loadingFavs !== undefined && props.model.user.displayName ? (
						<div className='profile-view'>
							<section className='profile'>
								<ProfileView user={props.model.user} inAnimation={props.model.inAnimation} />
								<section className='favorites'>
									{props.model.favorites.length ? (
										<>
											<h3>Your favorites</h3>
											<BrowseView
												browseResult={props.model.favorites}
												doAdd={doAddACB}
												doRemove={doRemoveACB}
												fav={props.model.favorites}
												auth={props.model.user}
												path={location.pathname}
												inAnimation={props.model.inAnimation}
												maxFavorites={props.model.maxFavorites}
											/>
										</>
									) : (
										<p>You have not added any favorites yet...</p>
									)}
								</section>
							</section>
							{defaultRender()}
						</div>
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
				<section className='friends'>
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
				</section>
			);
		else {
			return <Vortex />;
		}
	}
});
