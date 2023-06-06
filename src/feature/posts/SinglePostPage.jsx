import { useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"
import { selectPostById } from "./postsSlice"
import PostAuthor from "./PostAuthor"
import TimeAgo from "./TimeAgo"
import ReactionButton from "./ReactionButton"
import PropTypes from 'prop-types'

const SinglePostPage = () => {

    const { postId } = useParams()

    const post = useSelector((state) => selectPostById(state, postId))

    if(!post) {
        return (
            <section>
                <h2>Post not found!</h2>
            </section>
        )
    }

  return (
    <section>
        <article className="post">
            <h2>{post.title}</h2>
            <div>
              <PostAuthor userId={post.user} /> <br /><br />
              <TimeAgo timestamp={post.date} />
            </div>
            <p className="post-content">{post.content}</p>
            <ReactionButton post={post} />
            <Link to={`/editPost/${post.id}`} className="button">Edit Post</Link>
            <Link to='/' className="btn-back">Back</Link>
        </article>
    </section>
  )
}

SinglePostPage.defaultProps = {
    match: "",
  };
  
  SinglePostPage.propTypes = {
    match: PropTypes.string,
  };

export default SinglePostPage