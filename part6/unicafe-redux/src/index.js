import React from 'react'
import ReactDOM from 'react-dom/client'
import counterReducer from './reducer'

import { createStore } from 'redux'

const store = createStore(counterReducer)

const App = () => {
    return (
        <div>
            good: {store.getState().good} <br></br>
            ok: {store.getState().ok} <br></br>
            bad: {store.getState().bad} <br></br>
            <button onClick={e => store.dispatch({ type: 'GOOD' })}>
                good
            </button> 
            <button onClick={e => store.dispatch({ type: 'OK' })}>
                ok
            </button> 
            <button onClick={e => store.dispatch({ type: 'BAD' })}>
                bad
            </button>
            <button onClick={e => store.dispatch({ type: 'ZERO' })}>
                reset stats
            </button>
        </div>
    )
}

const root = ReactDOM.createRoot(document.getElementById('root'))

const renderApp = () => {
  root.render(<App />)
}

renderApp()
store.subscribe(renderApp)