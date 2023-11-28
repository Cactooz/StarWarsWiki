export default function(card) {
return (
    <div key={card.id} className="cards" onClick={card.onClick}>
        <img src={card.image} height={'100'}></img>
        <div>{card.name}</div>
    </div>
);
}