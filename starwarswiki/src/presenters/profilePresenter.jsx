import {observer} from "mobx-react-lite";
import ProfileView from "../views/profileView.jsx";
import {Link} from "react-router-dom";

export default observer(
	function ProfilePresenter(props) {
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
			return <ProfileView currentUser={props.model.user} favorites={props.model.favorites}/>;
	}
);