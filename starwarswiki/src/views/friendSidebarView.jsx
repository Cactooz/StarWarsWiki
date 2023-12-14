import { Link } from "react-router-dom";

export default function FriendSidebarView(props) {
	return (
		<>
			<button
				onClick={props.shouldShowId === false ? props.showID : props.hideID}>{props.shouldShowId === false ? "Click to show your ID" : "Click to hide your ID"}</button>
			<p>{props.shouldShowId === true ? props.yourID : ""}</p>
			<h3>{props.friendRequest.length ? "Your Friend Requests" : ""}</h3>
			{props.friendRequest.length ? props.friendRequest.map(showFriends) : ""}
			<h3>These Are Your Friends!</h3>
			<p>Add friends with friend id:
				<input type={"text"} placeholder={"Enter Your Friends ID"} onKeyUp={props.addfriend}/>
				{props.isUser === "self" ? "You Can Not Add YourSelf!" : props.isUser === false ? "No User Found With That ID" : "Friend Request Sent!"}
			</p>
			<>
				{props.friends.length ? props.friends.map(showAllCB) : "Add friends to show them here!"}
			</>
		</>
	);

	function showFriends(friend) {
		function acceptFriend() {
			props.acceptFriend(friend)
		}

		function declineFriend() {
			props.declineFriend(friend)
		}

		return (<div key={friend}>
			{friend}
			<button onClick={acceptFriend}>Accept</button>
			<button onClick={declineFriend}>Decline</button>
		</div>)
	}

	function showAllCB(friend) {
		return (
			<div key={friend}>
				<Link to={"/profile/" + friend} key={friend}>
					{friend}
				</Link>
			</div>
		)
	}
}