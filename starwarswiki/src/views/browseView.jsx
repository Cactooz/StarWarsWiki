export default function browseView(props){
return(
    <div>
        {props.browsResult.map(showAllCB)}
    </div>
);
function showAllCB(card){
    function showResultACB(){
        props.showDetailsACB(card);
    }

    return(
    <div key = {card.id} className="cards" onClick={showDetailsACB}>
        <img src={card.image} height={'100'}></img>
    </div>
    );
}
}

