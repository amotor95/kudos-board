import { useState } from 'react'
import Modal from '../Modal/Modal'
import './CreateBoard.css'
import { createCard } from '../utils/apiUtils'
import { fetchGIPHYBySearch } from '../utils/apiUtils'
import GiphyDisplay from './GIPHY/GiphyDisplay'

const CreateCard = ({ closeModal, triggerRefresh, boardID}) => {
    const [title, setTitle] = useState("")
    const [message, setMessage] = useState("")
    const [gifSearchText, setGifSearchText] = useState("")
    const [gifURL, setGifURL] = useState("")
    const [searchGifs, setSearchGifs] = useState([])
    const [author, setAuthor] = useState("")
    
    const fetchAndProcessGIPHYBySearch = async () => {
        try {
            const newGiphs = await fetchGIPHYBySearch(gifSearchText)
            setSearchGifs(newGiphs.data)
        } catch (error) {
            console.error('Error fetching GIFs:', error)
        }
    }

    const addCard = () => {
        if (!title || !message || !gifURL) {
            return;
        }
        const card = {
            "board_id": boardID, 
            "title": title,
            "message": message,
            "gif": gifURL,
            "author": author,
            "num_upvotes": 0,
        }
        createCard(card)
        setTitle("")
        setMessage("")
        setGifSearchText("")
        setGifURL("")
        setSearchGifs([])
        setAuthor("")
        closeModal()
        triggerRefresh()
    }

    const searchGIPHY = () => {
        fetchAndProcessGIPHYBySearch()
    }

    const updateGIFURL = (newURL) => {
        setGifURL(newURL)
    }

    return(
        <Modal closeModal={closeModal}>
            <h1 className='modal-title'>Create a Card</h1>

            <h2 className='modal-input-label'>Title (required):</h2>
            <input className='modal-input-text' value={title} onChange={(e) => setTitle(e.target.value)}></input>

            <h2 className='modal-input-label'>Message (required):</h2>
            <input className='modal-input-text' value={message} onChange={(e) => setMessage(e.target.value)}></input>

            <h2 className='modal-input-label'>Search GIFs:</h2>
            <input className='modal-input-text' value={gifSearchText} onKeyDown={(e) => { if (e.key === "Enter") {searchGIPHY()}}} onChange={(e) => setGifSearchText(e.target.value)}></input>
            { searchGifs && <GiphyDisplay gifs={searchGifs} updateGIFURL={updateGIFURL}/>}
            <button className='modal-input-button' onClick={() => searchGIPHY()}>Search GIFs</button>

            <h2 className='modal-input-label'>GIF URL (required):</h2>
            <input className='modal-input-text' value={gifURL} onChange={(e) => setGifURL(e.target.value)}></input>

            <h2 className='modal-input-label'>Author (optional):</h2>
            <input className='modal-input-text' value={author} onChange={(e) => setAuthor(e.target.value)}></input>


            <button className='modal-input-button' onClick={() => addCard()}>Create Card</button>
        </Modal>
    )
}

export default CreateCard