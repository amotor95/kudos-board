import { createComment } from '../utils/api_utils'
import './CommentModal.css'
import { useState, useEffect } from 'react'
import Modal from '../Modal/Modal'
import CommentList from '../CommentList/CommentList'
import { fetchCommentsByCardID } from '../utils/api_utils'

const CommentModal = ({card, closeModal}) => {
    const [comments, setComments] = useState([])
    const [refresh, setRefresh] = useState(false)
    const [author, setAuthor] = useState("")
    const [message, setMessage] = useState("")
    
    const fetchAndProcessCommentsByCardID = async () => {
        const newComments = await fetchCommentsByCardID(card.id)
        setComments(newComments)
    }

    const addComment = () => {
        if (!message) {
            return;
        }

        const comment = {
            "card_id": card.id, 
            "message": message,
            "author": author,
        }

        createComment(comment)
        setMessage("")
        setAuthor("")
        triggerRefresh()
    }

    useEffect( () => {
        fetchAndProcessCommentsByCardID()
    }, [refresh])

    const triggerRefresh = () => {
        setTimeout(() => setRefresh(prev => !prev), 100)
    }

    return(
        <Modal closeModal={closeModal}>
            <div className='commentmodal'>
                <div className='commentmodal-card'>
                    <div className='card'>
                <img src={card.gif} alt={`${card.title} gif`}></img>
                <h3 className='card-title'>{card.title}</h3>
                <p className='card-message'>{card.message}</p>
                <p className='card-author'>{card.author}</p>
            </div>
                </div>
                <div className='commentmodal-comments'>
                    <div className='commentmodal-comments-comments'>
                        <CommentList comments={comments}></CommentList>
                    </div>
                    <div className='commentmodal-comments-createcomment'>
                        <p className='comment-input-label'>Author (optional):</p>
                        <input className='comment-input' value={author} onChange={(e) => setAuthor(e.target.value)}></input>
                        <p className='comment-input-label'>Message:</p>
                        <input className='comment-input' value={message} onChange={(e) => setMessage(e.target.value)}></input>
                        <button onClick={addComment}>Create Comment</button>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default CommentModal