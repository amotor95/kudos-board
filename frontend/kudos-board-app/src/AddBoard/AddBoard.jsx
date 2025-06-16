import { useState } from 'react'
import CreateBoard from '../CreateModals/CreateBoard'
import './AddBoard.css'

const AddBoard = ({triggerRefresh}) => {
    const [showCreateBoard, setShowCreateBoard] = useState(false)
    
    const closeModal = () => {
        setShowCreateBoard(false)
    }
    return(
        <div className='addboard'>
            <button className='addboard-button' onClick={() => setShowCreateBoard(true)}>Add Board</button>
            { showCreateBoard ? <CreateBoard closeModal={closeModal} triggerRefresh={triggerRefresh}></CreateBoard> : null}
        </div>
    )
}

export default AddBoard