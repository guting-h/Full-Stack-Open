import { createSlice } from '@reduxjs/toolkit'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    vote (state, action) {
      const id = action.payload
      const toVote = state.find(a => a.id === id)
      const changed = {
        ...toVote, 
        votes: toVote.votes + 1
      }
      return state.map(a => a.id !== id ? a: changed)
    },
    createAnecdote (state, action) {
      const content = action.payload
      state.push(content)
    },
    setAnecdotes (state, action) {
      return action.payload
    }
  }
})

export const { vote,  createAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer