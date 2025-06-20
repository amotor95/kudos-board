import { createComment } from '../utils/apiUtils'
import './CommentModal.css'
import { useState, useEffect } from 'react'
import Modal from '../Modal/Modal'
import CommentList from '../CommentList/CommentList'
import { fetchCommentsByCardID } from '../utils/apiUtils'

const CommentModal = ({card, closeModal}) => {
    const [comments, setComments] = useState([])
    const [refresh, setRefresh] = useState(false)
    const [author, setAuthor] = useState("")
    const [message, setMessage] = useState("")
    
    const fetchAndProcessCommentsByCardID = async () => {
        try {
            const newComments = await fetchCommentsByCardID(card.id)
            setComments(newComments)
        } catch (error) {
            console.error('Error fetching comments:', error)
        }
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
        setTimeout(() => setRefresh(prev => !prev), import.meta.env.VITE_TIMEOUT_DELAY_MS)
    }

    return(
        <Modal closeModal={closeModal}>
            <div className='commentmodal'>
                <div className='commentmodal-card'>
                    <div className='card'>
                <img className='commentmodal-image' src={card.gif} alt={`${card.title} gif`}></img>
                <h3 className='card-title'>{card.title}</h3>
                <p className='card-message'>{card.message}</p>
                <p className='card-author'>{card.author}</p>
            </div>
                </div>
                <div className='commentmodal-comments'>
                    <div className='commentmodal-comments-comments'>
                        {comments && comments.length !== 0 ? <CommentList comments={comments}></CommentList> : null}
                    </div>
                    <div className='commentmodal-comments-createcomment'>
                        <p className='comment-input-label'>Author (optional):</p>
                        <input className='comment-input' value={author} onChange={(e) => setAuthor(e.target.value)}></input>
                        <p className='comment-input-label'>Message (required0):</p>
                        <input className='comment-input' value={message} onChange={(e) => setMessage(e.target.value)}></input>
                        <button className='comment-createcomment-button' onClick={addComment}>Create Comment</button>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default CommentModal