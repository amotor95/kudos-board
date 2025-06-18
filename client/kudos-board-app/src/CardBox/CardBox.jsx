import { useState, useEffect } from 'react'
import CardList from '../CardList/CardList'
import AddCard from '../AddElement/AddCard'
import { fetchCardsByBoardID, upvoteCardByID, deleteCardByID } from '../utils/api_utils'

const CardBox = ({boardID}) => {
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
        const newCards = await fetchCardsByBoardID(boardID)
        processCards(newCards)
    }

    useEffect(() => {
        if (triggerRefresh) {
            fetchAndProcessCardsByBoardID()
            setRefresh(false)
        }
    }, [refresh])

    const triggerRefresh = () => {
        setRefresh(prev => !prev)
    }

    const handleCardUpvote = (cardID) => {
        upvoteCardByID(cardID)
        triggerRefresh()
    }

    const handleCardDelete = (cardID) => {
        deleteCardByID(cardID)
        triggerRefresh()
    }

    return(
        <div className='cardbox'>
            <AddCard triggerRefresh={triggerRefresh}/>
            <CardList cards={cards} cardOrder={cardOrder} handleCardUpvote={handleCardUpvote} handleCardDelete={handleCardDelete}></CardList>
        </div>
    )
}

export default CardBox