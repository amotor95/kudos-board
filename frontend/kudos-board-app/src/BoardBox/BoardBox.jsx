import { useState, useEffect } from 'react'
import './BoardBox.css'
import SearchBar from '../SearchBar/SearchBar'
import BoardList from '../BoardList/BoardList'
import AddBoard from '../AddBoard/AddBoard'
import { fetchAllBoards, fetchBoardsBySearch } from '../utils/api_utils'

const BoardBox = () => {
    const [refresh, setRefresh] = useState(false)
    const [boards, setBoards] = useState({})
    const [boardOrder, setBoardOrder] = useState([])
    const [searchQuery, setSearchQuery] = useState("")


    const processBoards = (newBoards) => {
        let newBoardsDict = {}
        let newBoardOrder = []
        newBoards.map( (board) => {
            newBoardsDict[board.id] = board
            newBoardOrder.push(board.id)
        })
        setBoards(newBoardsDict)
        setBoardOrder(newBoardOrder)
    }

    const fetchAndProcessBoardsBySearch = async () => {
        const newBoards = await fetchBoardsBySearch(searchQuery) 
        processBoards(newBoards)
    }

    const fetchAndProcessAllBoards = async () => {
        const newBoards = await fetchAllBoards()
        processBoards(newBoards)
    }

    useEffect( () => {
        if (!searchQuery) {
            fetchAndProcessAllBoards()
        } else {
            fetchAndProcessBoardsBySearch()
        }
    }, [refresh])

    const triggerRefresh = () => {
        console.log("refresh triggered")
        setRefresh(prev => !prev)
    }

    const updateSearchQuery = (query) => {
        setSearchQuery(query)
    }

    const handleSearch = () => {
        if (!searchQuery) {
            fetchAndProcessAllBoards()
        } else {
            fetchAndProcessBoardsBySearch()
        }
    }

    const handleClearSearch = () => {
        setSearchQuery("")
        triggerRefresh()
        fetchAndProcessAllBoards()
    }

    return (
        <div className='boardbox'>
            <SearchBar searchQuery={searchQuery} updateSearchQuery={updateSearchQuery} handleSearch={handleSearch} handleClearSearch={handleClearSearch}/>
            <AddBoard triggerRefresh={triggerRefresh}/>
            <BoardList boards={boards} boardOrder={boardOrder} triggerRefresh={triggerRefresh}/>
        </div>
    )
}

export default BoardBox