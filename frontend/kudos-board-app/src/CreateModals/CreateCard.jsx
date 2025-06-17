import { useState } from 'react'
import Modal from './Modal'
import './CreateModals.css'
import { createCard } from '../utils/api_utils'

const CreateCard = ({ closeModal, triggerRefresh, board_id}) => {
    const [title, setTitle] = useState("")
    const [message, setMessage] = useState("")
    const [gifSearchText, setGifSearchText] = useState("")
    const [gifURL, setGifURL] = useState("")
    const [author, setAuthor] = useState("")
    
    const addCard = () => {
        if (!title || !message || !gif) {
            return;
        }
        const card = {
            "board_id": board_id, 
            "title": title,
            "message": message,
            "gif": gif,
            "author": author,
        }
        createCard(card)
        setTitle("")
        setGif("")
        setAuthor("")
        closeModal()
        triggerRefresh()
    }

    return(
        <Modal closeModal={closeModal}>
            <h1 className='modal-title'>Create a Card</h1>

            <h2 className='modal-input-label'>Title (required):</h2>
            <input className='modal-input-text' value={title} onChange={(e) => setTitle(e.target.value)}></input>

            <h2 className='modal-input-label'>Message (required):</h2>
            <input className='modal-input-text' value={message} onChange={(e) => setMessage(e.target.value)}></input>

            <input className='modal-input-text' value={gifSearchText} onChange={(e) => setGifSearchText(e.target.value)}></input>
            <button className='modal-input-button'>Search GIFs</button>

            <h2 className='modal-input-label'>Author (optional):</h2>
            <input className='modal-input-text' value={author} onChange={(e) => setAuthor(e.target.value)}></input>


            <button className='modal-input-button' onClick={() => addBoard()}>Create Board</button>
        </Modal>
    )
}

export default CreateBoard