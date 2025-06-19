import Comment from "../Comment/Comment"
import './CommentList.css'

const CommentList = ({comments}) => {
    return(
        <div className='commentlist'>
            {comments && comments.map((comment) => {
                return <Comment key={comment.id} comment={comment}/>
            })}
        </div>
    )
}

export default CommentList