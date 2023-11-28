import Card from "../components/Card.jsx";
export default function browseView(props){
return(
    <div>
        {props.browseResult.map(showAllCB)}
    </div>
);
function showAllCB(card){
    function showDetailsACB(event){
        console.log(event.target)
        //FIRE CUSTOM EVENT HERE AND USE ROUTER
    }
    return(
    <Card id={card.id} name ={card.name} image={card.image} onClick={showDetailsACB}/>
    );
}
}

