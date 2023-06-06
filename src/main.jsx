import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import store from './app/store.js'
import { Provider } from 'react-redux'
import { worker } from './api/server'
import { fetchUsers } from './feature/users/usersSlice.js'

async function start() {
  // start our mock API server
  await worker.start({ onUnhandlesRequest: 'bypass'})
}

store.dispatch(fetchUsers())

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>,
  </React.StrictMode>,
)

start();
