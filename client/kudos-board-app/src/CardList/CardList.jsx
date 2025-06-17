import { useState, useEffect } from 'react'
import Card from "../Card/Card";
import { fetchCardsByBoardID } from '../utils/api_utils';

const CardList = ({ cards, cardOrder, handleCardUpvote, handleCardDelete }) => {
    return(
        <div className='cardlist'>
            {cards && cardOrder && cardOrder.map((id) => {
                return <Card key={cards[id].id} card={cards[id]} handleUpvote={handleCardUpvote} handleDelete={handleCardDelete}></Card>
            })}
        </div>
    )
}

export default CardList