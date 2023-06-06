import { useSelector } from "react-redux";
import PropTypes from 'prop-types'
import { selectUserById } from '../users/usersSlice'

const PostAuthor = ({ userId }) => {
  const author = useSelector((state) => selectUserById(state, userId))
  
  return (
    <span>
      <i>By {author ? author.name : 'Unkonwn author'}</i>
    </span>
  )
}

PostAuthor.defaultProps = {
  userId: "",
};

PostAuthor.propTypes = {
  userId: PropTypes.string,
};

export default PostAuthor