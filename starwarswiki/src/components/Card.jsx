import {Link} from "react-router-dom";
import "../style.css"

export default function(card) {
return (
    <div key={card.id} className="cards" onClick={card.onClick}>
        <Link to={card.name}>
        <img src={card.image} height={'100'}></img>
        <div>{card.name}</div>
        </Link>
    </div>

);
}