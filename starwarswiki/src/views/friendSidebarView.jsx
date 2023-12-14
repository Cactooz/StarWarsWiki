import { Link } from "react-router-dom";

export default function FriendSidebarView(props) {
	return (
		<>
			<button
				onClick={props.shouldShowId === false ? props.showID : props.hideID}>{props.shouldShowId === false ? "Click to show your ID" : "Click to hide your ID"}</button>
			<p>{props.shouldShowId === true ? props.yourID : ""}</p>
			<h3>{props.friendRequest.length ? "Your Friend Requests" : ""}</h3>
			{props.friendRequest.length ?
				<div>
					{props.friendRequest.map(showFriends)}
					<button>Accept</button>
					<button>Decline</button>
				</div> : ""}
			<h3>These Are Your Friends!</h3>
			<p>Add friends with friend id:
				<input type={"text"} placeholder={"Enter Your Friends ID"} onKeyUp={props.addfriend}/>
				{props.isUser === false ? "No User found with that ID" : ""}
			</p>
			<>
				{props.friends.length ? props.friends.map(showAllCB) : "Add friends to show them here!"}
			</>
		</>
	);

	function showFriends(friend) {
		return (<div key={friend}>{friend}</div>)
	}

	function showAllCB(friend) {
		console.log(friend)
		return (
			<div key={friend}>
				<Link to={friend} key={friend}>
					{friend}
				</Link>
			</div>
		)
	}
}