import './CreateModals.css'

const Modal = ({ children, closeModal }) => {
    const handleClose = (e) => {
        if (e.currentTarget === e.target) {
            closeModal()
        }
    }
    return(
        <div className='modal' onClick={(e) => handleClose(e)}>
            <div className='modal-content'>
                <button className='modal-close-button' onClick={(e) => handleClose(e)}>×</button>
                {children}
            </div>
        </div>
    )
}

export default Modal