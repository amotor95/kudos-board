import { useState } from 'react'
import { useParams } from 'react-router-dom';
import CreateBoard from '../CreateModals/CreateBoard'
import CreateCard from '../CreateModals/CreateCard'
import './AddElement.css'

const AddElement = ({triggerRefresh, elementType}) => {
    const [showCreate, setShowCreate] = useState(false)
    const { boardID } = useParams()
    
    const closeModal = () => {
        setShowCreate(false)
    }

    const handleCreateElementModal = () => {
        switch (elementType) {
            case "board":
                return <CreateBoard closeModal={closeModal} triggerRefresh={triggerRefresh}></CreateBoard>
                break;
            case "card":
                return <CreateCard closeModal={closeModal} triggerRefresh={triggerRefresh} boardID={boardID}></CreateCard>
                break;
        }
    }

    return(
        <div className='addelement'>
            <button className='addelement-button' onClick={() => setShowCreate(true)}>Add {elementType.charAt(0).toUpperCase() + elementType.slice(1)}</button>
            { showCreate ? handleCreateElementModal() : null}
        </div>
    )
}

export default AddElement