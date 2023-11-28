import Card from "../components/Card.jsx";
export default function browseView(props){
return(
    <div>
        {props.browseResult.map(showAllCB)}
    </div>
);
function showAllCB(card){
    function showDetailsACB(){
        props.showDetailsACB(card);
    }

    return(
    <Card card={card}/>
    );
}
}

