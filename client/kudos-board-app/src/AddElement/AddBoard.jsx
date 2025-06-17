import AddElement from "./AddElement";

const AddBoard = ({triggerRefresh}) => {
    return(
        <div className='addboard'>
            <AddElement triggerRefresh={triggerRefresh} elementType={"board"}/>
        </div>
    )
}

export default AddBoard