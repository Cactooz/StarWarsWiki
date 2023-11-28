export default function(card) {
    function showDetailsACB(){
        props.showDetailsACB(card);
    }

return (
    <div key={card.id} className="cards" onClick={showDetailsACB}>
        <img src={card.image} height={'100'}></img>
        <div>{card.name}</div>
    </div>
);
}