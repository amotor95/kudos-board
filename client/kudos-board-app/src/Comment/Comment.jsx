import './Comment.css'

const Comment = ({comment}) => {
    return(
        <div className='comment'>
            <p className='comment-author'>{comment.author ? comment.author : ""}</p>
            <p>{comment.message}</p>
        </div>
    )
}

export default Comment