import React from 'react'
import './App.css'
import {  BrowserRouter as Router, Route, Routes,} from 'react-router-dom'
import Navbar from './app/Navbar'
import PostsList from './feature/posts/PostsList'
import AddPostForm from './feature/posts/AddPostForm'
import SinglePostPage from './feature/posts/SinglePostPage'
import EditPostForm from './feature/posts/EditPostForm'
import UserList from './feature/users/UserList'
import UserPage from './feature/users/UserPage'
import NotificationsList from './feature/notifications/NotificationsList'

function App() {
  return (
    <Router>
      <Navbar />
      <div className='App'>
        <Routes>
          <Route exact path='/' element={ 
            <React.Fragment>
              <AddPostForm />
              <PostsList />
            </React.Fragment> 
          } />
          <Route exact path='/posts/:postId' element={<SinglePostPage />} />
          <Route exact path='/editPost/:postId' element={<EditPostForm />} />
          <Route exact path='/users' element={<UserList />} />
          <Route exact path='/users/:userId' element={<UserPage />} />
          <Route exact path='/notifications' element={<NotificationsList />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
