import { Link } from 'react-router-dom';

export default function FriendSidebarView(props) {
	return (
		<>
			<button onClick={props.shouldShowId === false ? props.showID : props.hideID}>
				{props.shouldShowId === false ? 'Click to show your ID' : 'Click to hide your ID'}
			</button>
			{props.shouldShowId === true ? <p>props.yourID</p> : null}
			{props.friendRequest.length ? <h3>Friend Requests</h3> : null}
			{props.friendRequest.length ? props.friendRequest.map(showFriends) : null}
			<p>Add friend</p>
			<input type={'text'} placeholder={`Enter your friend's ID`} onKeyUp={props.addfriend} />
			{props.sentRequests.length ? <h3>Pending Requests</h3> : null}
			{props.sentRequests.length ? props.sentRequests.map(showRequests) : null}
			{props.friends.length ? <h3>Your Friends</h3> : null}
			<ul>{props.friends.length ? props.friends.map(showAllCB) : null}</ul>
		</>
	);

	function showRequests(friend) {
		function cancelFriend() {
			props.cancelFriend(friend);
		}

		return (
			<div key={friend}>
				{props.names[friend]}
				<button onClick={cancelFriend}>Cancel</button>
			</div>
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
			<div key={friend}>
				{props.names[friend]}
				<button onClick={acceptFriend}>Accept</button>
				<button onClick={declineFriend}>Decline</button>
			</div>
		);
	}

	function showAllCB(friend) {
		function removeFriend() {
			props.removeFriend(friend);
		}

		return (
			<div key={friend}>
				<Link to={'/profile/' + friend} key={friend}>
					{props.names[friend]}
				</Link>
				{props.site === friend ? (
					<Link to={'/profile'}>
						<button onClick={removeFriend}>Remove Friend</button>
					</Link>
				) : (
					<button onClick={removeFriend}>Remove Friend</button>
				)}
			</div>
		);
	}
}
