import './Comment.css'

const Comment = ({comment}) => {
    return(
        <div className='comment'>
            <p>{comment.author ? comment.author : ""}</p>
            <p>{comment.message}</p>
        </div>
    )
}

export default Comment