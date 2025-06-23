import './Modal.css'

const Modal = ({ children, closeModal }) => {
    const handleClose = (e) => {
        if (e.currentTarget === e.target) {
            closeModal()
        }
    }
    return(
        <div className='modal' onClick={handleClose}>
            <div className='modal-content'>
                <button className='modal-close-button' onClick={handleClose}>×</button>
                {children}
            </div>
        </div>
    )
}

export default Modal