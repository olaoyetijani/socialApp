import { useState } from "react";
import { selectPostById } from "./postsSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom"
import { postUpdated } from "./postsSlice";
import { Link } from "react-router-dom";
import './styles.css'

const EditPostForm = () => {
    const {postId} = useParams();

    const post = useSelector((state) => selectPostById(state, postId))

    const [title, setTitle] = useState(post.title)
    const[content, setContent] = useState(post.content)

    const dispatch = useDispatch();
    const navigate = useNavigate

    const onTitleChanged = e => setTitle(e.target.value)
    const onContentChanged = e => setContent(e.target.value)

    const onSavePostClicked = () => {
        if(title && content) {
          dispatch(postUpdated({id: postId, title, content }))
          navigate(`/posts/${postId}`)
        } 
    }

  return (
    <section>
      <h2>Edit Post</h2>
      <form className="addPost">
        <label htmlFor="postTitle"><b>Post Title:</b></label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          placeholder="What's on your mind?"
          value={title}
          onChange={onTitleChanged}
        />
        <label htmlFor="postContent"><b>Content:</b></label>
        <textarea
          id="postContent"
          name="postContent"
          value={content}
          onChange={onContentChanged}
        />
      </form>
      <button type="button" className="btn-save" onClick={onSavePostClicked}>
        Save Post
      </button>
      <Link to='/' className="btn-back">Back</Link>
    </section>
  )
}

export default EditPostForm