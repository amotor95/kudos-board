import { useState } from 'react'
import CreateBoard from '../CreateModals/CreateBoard'
import CreateCard from '../CreateModals/CreateCard'
import './AddElement.css'

const AddElement = ({triggerRefresh, elementType}) => {
    const [showCreate, setShowCreate] = useState(false)
    
    const closeModal = () => {
        setShowCreate(false)
    }

    const handleCreateElementModal = () => {
        switch (elementType) {
            case "board":
                return <CreateBoard closeModal={closeModal} triggerRefresh={triggerRefresh}></CreateBoard>
                break;
            case "card":
                return <CreateCard closeModal={closeModal} triggerRefresh={triggerRefresh}></CreateCard>
                break;
        }
    }

    return(
        <div className='addelement'>
            <button className='addelement-button' onClick={() => setShowCreate(true)}>Add {elementType}</button>
            { showCreate ? () => handleCreateElementModal() : null}
        </div>
    )
}

export default AddElement