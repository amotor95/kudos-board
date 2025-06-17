import { useNavigate, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

import { fetchBoardByID  } from '../utils/api_utils'

import './BoardPage.css'
import AddCard from '../AddElement/AddCard'

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

    const triggerRefresh = () => {
        setRefresh(prev => !prev)
    }

    const returnHome = () => {
        navigate('/')
    }
    return(
        <div className='boardpage'>
            <button className='return-home-button' onClick={() => returnHome()}>{"<"}</button>
            <h1 className='boardpage-title'>{board.title}</h1>
            <AddCard/>
        </div>
    )
}

export default BoardPage