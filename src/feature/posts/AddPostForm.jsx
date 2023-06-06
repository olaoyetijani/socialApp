import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addNewPost } from "./postsSlice"
import {selectAllUsers} from '../users/usersSlice'
import './styles.css'



const AddPostForm = () => {
  const [title, setTitle ] = useState('')
  const [content, setContent] = useState('')
  const [userId, setUserId] = useState('')
  const [addRequestStatus, setAddRequestStatus] = useState('idle')

  const dispatch = useDispatch()
  const users = useSelector(selectAllUsers)

  const onTitleChanged = e => setTitle(e.target.value)
  const onContentChanged = e => setContent(e.target.value)
  const onAuthorChanged = e => setUserId(e.target.value)


  const canSave = [title, content, userId].every(Boolean) && addRequestStatus === 'idle'

  const onSavePostClicked = async () => {
    if(canSave) {
      try {
        setAddRequestStatus('pending')
        await dispatch(addNewPost({ title, content, user: userId})).unwrap()
        setTitle('')
        setContent('')
        setUserId('')
      } catch (err) {
        console.error('Failed to save the post: ', err)
      } finally {
        setAddRequestStatus('idle')
      }
    }
  }

  const usersOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ))

  return (
    <section>
      <h2>Add a New Post</h2>
      <form className="addPost">
        <label htmlFor="postTitle"><b>Post Title:</b></label>
        <input 
          type="text"
          id="postTitle"
          placeholder="What's Your on mind ?"
          name="postTitle"
          value={title}
          onChange={onTitleChanged}
        />
        <label htmlFor="postAuthor"><b>Author:</b></label>
        <select id="postAuthor" value={userId} onChange={onAuthorChanged}>
          <option value=''></option>
          {usersOptions}
        </select>
        <label htmlFor="postContent"><b>Content:</b></label>
        <textarea
          id="postContent"
          name="postContent"
          value={content}
          onChange={onContentChanged}
        />
        <button type="button" className="btn-save" onClick={onSavePostClicked} disabled={!canSave}>Save Post</button>
      </form>
    </section>
  )
}

export default AddPostForm