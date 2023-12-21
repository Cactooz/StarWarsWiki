import { Link } from 'react-router-dom';
import Toastify from '../components/Toastify';
import { toast } from 'react-toastify';

export default function FriendSidebarView(props) {
	return (
		<>
			<h3>Add friends</h3>
			<input
				type={'text'}
				placeholder={`Enter your friend's ID`}
				onKeyUp={props.addfriend}
				maxLength={28}
			/>
			<button onClick={showAndCopyID} className='id-button' title='Click to show/hide your ID'>
				{props.shouldShowId === false ? 'Click to show your ID' : props.yourID}
			</button>
			{props.friendRequest.length ? <h3>Friend Requests</h3> : null}
			{props.friendRequest.length ? <ul>{props.friendRequest.map(showFriends)}</ul> : null}
			{props.sentRequests.length ? <h3>Pending Requests</h3> : null}
			{props.sentRequests.length ? <ul>{props.sentRequests.map(showRequests)}</ul> : null}
			{props.friends.length ? <h3>Your Friends</h3> : null}
			{props.friends.length ? <ul>{props.friends.map(showAllCB)}</ul> : null}
			<Toastify />
		</>
	);

	function showAndCopyID() {
		props.shouldShowId === false ? props.showID() : props.hideID();
		if (!props.shouldShowId) {
			navigator.clipboard.writeText(props.yourID);
			toast.info('Copied ID to clipboard!');
		}
	}

	function showRequests(friend) {
		function cancelFriend() {
			props.cancelFriend(friend);
		}

		return (
			<li key={friend}>
				<p>{props.names[friend]}</p>
				<button
					onClick={cancelFriend}
					title={'Cancel outgoing friend request to ' + props.names[friend]}
				>
					<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 384 512'>
						<path d='M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z' />
					</svg>
				</button>
			</li>
		);
	}

	function showFriends(friend) {
		function acceptFriend() {
			props.acceptFriend(friend);
		}

		function declineFriend() {
			props.declineFriend(friend);
		}

		return (
			<li key={friend}>
				<p>{props.names[friend]}</p>
				<button onClick={acceptFriend} title={'Accept friend request from ' + props.names[friend]}>
					<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 448 512'>
						<path d='M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z' />
					</svg>
				</button>
				<button
					onClick={declineFriend}
					title={'Decline friend request from ' + props.names[friend]}
				>
					<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 384 512'>
						<path d='M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z' />
					</svg>
				</button>
			</li>
		);
	}

	function showAllCB(friend) {
		function removeFriend() {
			props.removeFriend(friend);
		}

		return (
			<li key={friend}>
				<Link
					to={'/profile/' + friend}
					key={friend}
					title={'Visit ' + props.names[friend] + "'s profile"}
				>
					{props.names[friend]}
				</Link>
				{props.site === friend ? (
					<Link to={'/profile'}>
						<button onClick={removeFriend} title={'Remove ' + props.names[friend] + 'as a friend'}>
							<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 384 512'>
								<path d='M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z' />
							</svg>
						</button>
					</Link>
				) : (
					<button onClick={removeFriend} title={'Remove ' + props.names[friend] + 'as a friend'}>
						<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 384 512'>
							<path d='M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z' />
						</svg>
					</button>
				)}
			</li>
		);
	}
}
