import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { legacy_createStore as createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import character from './modules/character.ts'
import { composeWithDevTools } from 'redux-devtools-extension'
import ReduxThunk from "redux-thunk"
import { BrowserRouter } from 'react-router-dom'
import './scss/index.scss'

const store = createStore(
  character,
  composeWithDevTools(applyMiddleware(ReduxThunk))
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)
