import {Link} from "react-router-dom";

export default function GoToProfile() {
	return (<Link to={"/profile"}>
			<p>Profile</p>
		</Link>
	);
}