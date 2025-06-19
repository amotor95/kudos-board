import { useNavigate, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

import { fetchBoardByID  } from '../utils/apiUtils'

import './BoardPage.css'
import AddCard from '../AddElement/AddCard'
import CardBox from '../CardBox/CardBox'

const BoardPage = () => {
    const params = useParams()
    const boardID = params.boardID

    const navigate = useNavigate()

    const [refresh, setRefresh] = useState(false)
    const [board, setBoard] = useState({})

    const fetchAndProcessBoardByID = async () => {
        const board = await fetchBoardByID(boardID)
        setBoard(board)
    }

    useEffect(() => {
        fetchAndProcessBoardByID()
    }, [refresh])

    const triggerBoardRefresh = () => {
        setTimeout(() => setRefresh(prev => !prev), import.meta.env.VITE_TIMEOUT_DELAY_MS)
    }

    const returnHome = () => {
        navigate('/')
    }

    let reversedPinnedCardIDs = board.pinnedCardIDs
    
    if (board.pinnedCardIDs) {
        reversedPinnedCardIDs = [...board.pinnedCardIDs].reverse()
    }
    
    return(
        <div className='boardpage'>
            <button className='return-home-button' onClick={() => returnHome()}>{"<"}</button>
            <h1 className='boardpage-title'>{board.title}</h1>
            <CardBox boardID={boardID} pinnedList={reversedPinnedCardIDs} triggerBoardRefresh={triggerBoardRefresh}></CardBox>
        </div>
    )
}

export default BoardPage