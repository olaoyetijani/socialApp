import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { fetchPosts, selectPostById, selectPostIds } from "./postsSlice"
import PostAuthor from "./PostAuthor"
import TimeAgo from "./TimeAgo"
import ReactionButton from "./ReactionButton"
import { useEffect } from "react"
import { Spinner } from "../../component/Spinner"


let PostExcerpt = ({ postId }) => {
  const post = useSelector((state) => selectPostById(state, postId))

  return (
    <article className="post-excerpt" key={post.id}>
      <h3>{post.title}</h3>
      <div>
        <PostAuthor userId={post.user} />
        <TimeAgo timestamp={post.date} />
      </div>
      <p className="post-content">{post.content.substring(0, 100)}</p>

      <ReactionButton post={post} />
      <Link to={`/posts/${post.id}`} className='button muted-button'>View Post</Link>
    </article>
  )
}

PostExcerpt = React.memo(PostExcerpt)

const PostsList = () => {

  const dispatch = useDispatch();
  const orderedPostIds = useSelector(selectPostIds)
  //const posts = useSelector(selectAllPosts);
  const postStatus = useSelector((state) => state.posts.status)
  const error = useSelector((state) => state.posts.error)

  useEffect(() => {
    if(postStatus === 'idle') {
      dispatch(fetchPosts())
    }
  }, [postStatus, dispatch])

  let content

  if (postStatus === 'loading') {
    content = <Spinner text="loading..."  />
  } else if (postStatus === 'suceeded') {
    content = orderedPostIds.map((postId) => (
      <PostExcerpt key={postId} postId={postId} />
    ))
  } else if (postStatus === 'failed') {
    content = <div> {error} </div>
  }


  return (
    <section className="posts-list">
      <h2>Posts</h2>
      {content}
    </section>
  )
}

export default PostsList

PostExcerpt.defaultProps = {
  postId: "",
};

PostExcerpt.propTypes = {
  postId: PropTypes.string,
};
