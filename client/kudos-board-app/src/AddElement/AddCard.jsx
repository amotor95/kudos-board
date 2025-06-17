import AddElement from "./AddElement";

const AddCard = ({triggerRefresh}) => {
    return(
        <div className='addcard'>
            <AddElement triggerRefresh={triggerRefresh} elementType={"card"}/>
        </div>
    )
}

export default AddCard