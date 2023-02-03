import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = () =>
  axios.get(baseUrl).then(res => res.data)

export const postAnecdote = async (AnecdoteObj) => {
  const res = axios.post(baseUrl, AnecdoteObj)
  return res.data
}

export const updateAnecdote = async updatedObj => {
  const res = await axios.put(`${baseUrl}/${updatedObj.id}`, updatedObj)
  return res.data
}
  
