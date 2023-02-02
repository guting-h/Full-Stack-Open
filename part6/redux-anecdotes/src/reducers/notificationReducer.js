import { createSlice } from '@reduxjs/toolkit'

const defaultMsg = null

const notificationSlice = createSlice({
  name: 'notification',
  initialState: defaultMsg,
  reducers: {
    setMsg (state, action) {
      return action.payload  
    },
    removeMsg (state, action) {
      return defaultMsg
    }
  }
})

export const setNotification = (msg, sec) => {
  return async dispatch => {
    dispatch(setMsg(msg))
    setTimeout(() => {
      dispatch(removeMsg())
    }, sec*1000)
  }
}

export const { setMsg, removeMsg } = notificationSlice.actions
export default notificationSlice.reducer