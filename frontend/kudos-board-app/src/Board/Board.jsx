import './Board.css'
import './Board'
import { deleteBoardByID } from '../utils/api_utils'

const Board = ({board, triggerRefresh}) => {
    const deleteBoard = () => {
        deleteBoardByID(board.id)
        triggerRefresh()
    }
    return(
        <div className='board'>
            <img className='board-image' src={board.image} alt={`${board.title} image`}></img>
            <p className='board-title'>{board.title}</p>
            <p className='board-author'>{board.author}</p>
            <div className='board-buttons'>
                <button className='board-details-button'>Details</button>
                <button className='board-delete-button' onClick={() => deleteBoard()}>Delete</button>
            </div>
        </div>
    )
}

export default Board