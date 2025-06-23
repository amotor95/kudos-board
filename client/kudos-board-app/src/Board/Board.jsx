import './Board.css'
import './Board'
import { deleteBoardByID } from '../utils/apiUtils'
import { useNavigate } from 'react-router-dom'

const Board = ({board, triggerRefresh}) => {
    const navigate = useNavigate()

    const deleteBoard = () => {
        deleteBoardByID(board.id)
        triggerRefresh()
    }

    const handleDetails = () => {
        navigate(`/boards/${board.id}`)
    }

    return(
        <div className='board'>
            <img className='board-image' src={board.image} alt={`${board.title} image`}></img>
            <p className='board-title'>{board.title}</p>
            <p className='board-category'>{board.category}</p>
            <p className='board-author'>{board.author}</p>
            <div className='board-buttons'>
                <button className='board-details-button' onClick={() => handleDetails()}>Details</button>
                <button className='board-delete-button' onClick={() => deleteBoard()}>Delete</button>
            </div>
        </div>
    )
}

export default Board