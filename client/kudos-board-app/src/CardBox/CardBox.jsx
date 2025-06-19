import { useState, useEffect } from 'react'
import CardList from '../CardList/CardList'
import AddCard from '../AddElement/AddCard'
import { fetchCardsByBoardID, upvoteCardByID, deleteCardByID, pinCardIDByBoardID } from '../utils/apiUtils'
import './CardBox.css'

const CardBox = ({boardID, pinnedList, triggerBoardRefresh}) => {
    const [refresh, setRefresh] = useState(false)
    const [cards, setCards] = useState({})
    const [cardOrder, setCardOrder] = useState([])

    const processCards = (newCards) => {
        let newCardsDict = {}
        let newCardOrder = []
        newCards && newCards.map( (card) => {
            newCardsDict[card.id] = card
            newCardOrder.push(card.id)
        })
        setCards(newCardsDict)
        setCardOrder(newCardOrder)
    }

    const fetchAndProcessCardsByBoardID = async () => {
        try {
            const newCards = await fetchCardsByBoardID(boardID)
            processCards(newCards)
        } catch (error) {
            console.error('Error fetching cards:', error)
        }
    }

    useEffect( () => {
        fetchAndProcessCardsByBoardID()
    }, [refresh])

    const triggerRefresh = () => {
        // Set timeout because it's fetching and processing new cards before database updates
        setTimeout(() => setRefresh(prev => !prev), 100)
    }

    const handleCardUpvote = (cardID) => {
        upvoteCardByID(cardID)
        triggerRefresh()
    }

    const handleCardDelete = (cardID) => {
        deleteCardByID(cardID)
        triggerRefresh()
    }

    const handlePinCard = (cardID) => {
        pinCardIDByBoardID({cardID, boardID})
        triggerBoardRefresh()
    }
    return(
        <div className='cardbox'>
            <AddCard triggerRefresh={triggerRefresh}/>
            {!(cards.length === 0 || cardOrder.length === 0) ? 
            <div>
                <div className='cardbox-numpinned'>Pinned Cards: {pinnedList && pinnedList.length}/6</div>
                <CardList cards={cards} cardOrder={cardOrder} handleCardUpvote={handleCardUpvote} handleCardDelete={handleCardDelete} handlePinCard={handlePinCard} pinnedList={pinnedList}></CardList>
            </div>
            : <div className='no-cards-found'>No cards found!</div> }
        </div>
    )
}

export default CardBox