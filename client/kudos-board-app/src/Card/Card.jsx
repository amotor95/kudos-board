import { useState } from 'react'

const Card = ({card, handleUpvote, handleDelete}) => {
    return(
        <div className='card'>
            <img src={card.gif} alt={`${card.title} gif`}></img>
            <h1 className='card-title'>{card.title}</h1>
            <p className='card-message'>{card.message}</p>
            <p className='card-author'>{card.author}</p>
            <div className='card-buttons'>
                <button className='card-upvote-button' onClick={() => handleUpvote(card.id)}>Upvote: {card.num_upvotes}</button>
                <button className='card-delete-button' onClick={() => handleDelete(card.id)}>Delete</button>
            </div>
        </div>
    )
}

export default Card