export default function(card) {
return (
    <div key={card.id} className="cards" onClick={showDetailsACB}>
        <img src={card.image} height={'100'}></img>
        <div>{card.name}</div>
    </div>
);
}