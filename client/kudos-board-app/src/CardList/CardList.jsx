import './CardList.css'
import Card from "../Card/Card";

const CardList = ({ cards, cardOrder, handleCardUpvote, handleCardDelete, handlePinCard, pinnedList }) => {
    console.log(pinnedList)
    return(
        <div className='cardlist'>
            {pinnedList && pinnedList.map((id) => {
                return <Card key={cards[id].id} card={cards[id]} handleUpvote={handleCardUpvote} handleDelete={handleCardDelete} handlePinCard={handlePinCard} pinned={true}></Card>
            })}
            {cards && cardOrder && cardOrder.map((id) => {
                if (pinnedList && pinnedList.includes(id)) {return}
                return <Card key={cards[id].id} card={cards[id]} handleUpvote={handleCardUpvote} handleDelete={handleCardDelete} handlePinCard={handlePinCard} pinned={false}></Card>
            })}
        </div>
    )
}

export default CardList