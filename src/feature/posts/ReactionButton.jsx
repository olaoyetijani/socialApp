import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { reactionAdded } from './postsSlice'

const reactionEmoji = {
    thumbsUp: '👍',
    hooray: '🎉',
    heart: '❤️',
    rocket: '🚀',
    eyes: '👀'
  }

const ReactionButton = ({ post }) => {

    const dispatch = useDispatch()

    const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
        return (
            <button 
                key={name} 
                type="button" 
                className="muted-button reaction-button"
                onClick={() => dispatch(reactionAdded({postId: post.id, reaction: name}))}
                >
                {emoji} {post.reactions[name]}
            </button>
        )
    })

  return (
    <div>
        {reactionButtons}
    </div>
  )
}

ReactionButton.defaultProps = {
    post: "",
  };
  
  ReactionButton.propTypes = {
    post: PropTypes.string,
  };
  

export default ReactionButton