import { useState, useEffect } from 'react'
import './BoardBox.css'
import SearchBar from '../SearchBar/SearchBar'
import BoardList from '../BoardList/BoardList'
import AddBoard from '../AddElement/AddBoard'
import FilterBar from '../FilterBar/FilterBar'
import { fetchBoardsBySearchAndFilter } from '../utils/api_utils'

const BoardBox = () => {
    const [refresh, setRefresh] = useState(false)
    const [boards, setBoards] = useState({})
    const [boardOrder, setBoardOrder] = useState([])
    const [searchQuery, setSearchQuery] = useState("")
    const [filter, setFilter] = useState("all")


    const processBoards = (newBoards) => {
        let newBoardsDict = {}
        let newBoardOrder = []
        newBoards && newBoards.map( (board) => {
            newBoardsDict[board.id] = board
            newBoardOrder.push(board.id)
        })
        setBoards(newBoardsDict)
        setBoardOrder(newBoardOrder)
    }

    const fetchAndProcessBoards = async () => {
        const newBoards = await fetchBoardsBySearchAndFilter(searchQuery, filter) 
        processBoards(newBoards)
    }

    useEffect( () => {
        fetchAndProcessBoards()
    }, [refresh])

    const triggerRefresh = () => {
        setRefresh(prev => !prev)
    }

    const updateSearchQuery = (query) => {
        setSearchQuery(query)
    }

    const handleSearch = () => {
        fetchAndProcessBoards()
    }

    const handleClearSearch = () => {
        setSearchQuery("")
        // Need this or else query race condition
        triggerRefresh()
        fetchAndProcessBoards()
    }

    const updateFilter = (mode) => {
        setFilter(mode)
        triggerRefresh()
        fetchAndProcessBoards()
    }

    return (
        <div className='boardbox'>
            <SearchBar searchQuery={searchQuery} updateSearchQuery={updateSearchQuery} handleSearch={handleSearch} handleClearSearch={handleClearSearch}/>
            <FilterBar updateFilter={updateFilter}/>
            <AddBoard triggerRefresh={triggerRefresh}/>
            <BoardList boards={boards} boardOrder={boardOrder} triggerRefresh={triggerRefresh}/>
        </div>
    )
}

export default BoardBox