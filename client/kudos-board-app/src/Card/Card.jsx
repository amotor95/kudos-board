import { useState } from 'react'
import CommentModal from '../CommentModal/CommentModal'
import { RiPushpinLine, RiPushpinFill } from "react-icons/ri";

import './Card.css'

const Card = ({card, handleUpvote, handleDelete, handlePinCard, pinned}) => {
    const [showCommentsModal, setShowCommentsModal] = useState(false)
    const closeModal = () => {
        setShowCommentsModal(false)
    }

    return(
        <div className='card'>
            <div className='card-pinbutton' onClick={() => handlePinCard(card.id)}>
                {pinned ? <RiPushpinFill className='card-pinbutton-icon' /> : <RiPushpinLine className='card-pinbutton-icon' />}
            </div>
            <img className='card-image' src={card.gif} alt={`${card.title} gif`}></img>
            <h3 className='card-title'>{card.title}</h3>
            <p className='card-message'>{card.message}</p>
            <p className='card-author'>{card.author}</p>
            <button className='card-commentmodal-button' onClick={() => setShowCommentsModal(true)}>Comments</button>
            <div className='card-buttons'>
                <button className='card-upvote-button' onClick={() => handleUpvote(card.id)}>Upvote: {card.num_upvotes}</button>
                <button className='card-delete-button' onClick={() => handleDelete(card.id)}>Delete</button>
            </div>
            {showCommentsModal ? <CommentModal card={card} closeModal={closeModal}/> : null}
        </div>
    )
}

export default Card