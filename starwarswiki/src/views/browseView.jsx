import Card from "../components/Card.jsx";

export default function browseView(props) {
	function reset() {
		props.resetPage()
	}

	addEventListener("popstate", reset)

	return (
		<div>
			{props.browseResult.map(showAllCB)}
		</div>
	);

	function showAllCB(card) {
		return (
			<Card key={card._id} name={card.name} image={card.image}/>
		);
	}
}

