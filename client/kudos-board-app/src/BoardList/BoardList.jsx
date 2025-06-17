import { useState } from 'react'
import Board from '../Board/Board'
import './BoardList.css'

const BoardList = ({ boards, boardOrder, triggerRefresh }) => {
    return (
        <div className='boardlist'>
            {boards && boardOrder && boardOrder.map((id) => {
                return <Board key={id} board={boards[id]} triggerRefresh={triggerRefresh}/>
            })}
        </div>
    )
}

export default BoardList