import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    vote (state, action) {
      const id = action.payload.id
      return state.map(a => a.id !== id ? a: action.payload)
    },
    appendAnecdote (state, action) {
      const content = action.payload
      state.push(content)
    },
    setAnecdotes (state, action) {
      return action.payload
    }
  }
})

export const initialAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.postAnecdote(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const updateVote = id => {
  return async dispatch => {
    const list = await anecdoteService.getAll()
    const toVote = list.find(a => a.id === id)
    const updatedObj = {
      ...toVote, 
      votes: toVote.votes + 1
    }
    await anecdoteService.update(id, updatedObj)
    dispatch(vote(updatedObj))
  }
}

export const { vote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer