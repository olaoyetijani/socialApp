import { configureStore } from '@reduxjs/toolkit'
import postsReducer from '../feature/posts/postsSlice'
import usersReducer from '../feature/users/usersSlice'
import notificationsReducer from '../feature/notifications/notificationsSlice'

export default configureStore({
    reducer: {
        posts: postsReducer,
        users: usersReducer,
        notifications: notificationsReducer,
    },
})