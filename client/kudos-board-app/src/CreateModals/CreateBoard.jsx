import { useState } from 'react'
import Modal from './Modal'
import './CreateModals.css'
import { createBoard } from '../utils/api_utils'

const CreateBoard = ({ closeModal, triggerRefresh }) => {
    const [title, setTitle] = useState("")
    const [category, setCategory] = useState("")
    const [image, setImage] = useState("https://picsum.photos/200?random=" + Math.floor(Math.random()*10000))
    const [author, setAuthor] = useState("")

    const addBoard = () => {
        if (!category || !title) {
            return;
        }
        const board = {
            "title": title,
            "category": category,
            "image": image,
            "author": author,
        }
        createBoard(board)
        setTitle("")
        setCategory("")
        setImage("")
        setAuthor("")
        closeModal()
        triggerRefresh()
    }

    return(
        <Modal closeModal={closeModal}>
            <h1 className='modal-title'>Create a Board</h1>

            <h2 className='modal-input-label'>Title (required):</h2>
            <input className='modal-input-text' value={title} onChange={(e) => setTitle(e.target.value)}></input>

            <h2 className='modal-input-label'>Category (required):</h2>

            <select className='modal-input-select' name='category-select' value={category} onChange={(e) => {setCategory(e.target.value)}}>
                <option value=''>Select a category:</option>
                <option value='celebration'>Celebration</option>
                <option value='thank-you'>Thank You</option>
                <option value='inspiration'>Inspiration</option>
            </select>

            <h2 className='modal-input-label'>Image (required):</h2>
            <input className='modal-input-text' value={image} onChange={(e) => setImage(e.target.value)}></input>

            <h2 className='modal-input-label'>Author (optional):</h2>
            <input className='modal-input-text' value={author} onChange={(e) => setAuthor(e.target.value)}></input>


            <button className='modal-input-button' onClick={() => addBoard()}>Create Board</button>
        </Modal>
    )
}

export default CreateBoard