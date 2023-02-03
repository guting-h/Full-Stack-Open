import { createContext, useReducer, useContext } from 'react'

const msgReducer = (state, action) => {
  switch (action.type) {
    case "VOTE":
        return `anecdote "${action.payload}" voted`
    case "NEW ANECDOTE":
        return `anecdote "${action.payload}" created`
    case "CLEAR":
        return null
    case "ERROR":
        return action.payload
    default:
        return state
  }
}

const MSGContext = createContext()

export const NotifContextProvider = (props) => {
  const [msg, msgDispatch] = useReducer(msgReducer, null)

  return (
    <MSGContext.Provider value={[msg, msgDispatch] }>
      {props.children}
    </MSGContext.Provider>
  )
}

export const useNotificationValue = () => {
  const notifyAndDispatch = useContext(MSGContext)
  return notifyAndDispatch[0]
}

export const useNotificationDispatch = () => {
  const notifyAndDispatch = useContext(MSGContext)
  return notifyAndDispatch[1]
}

export default MSGContext