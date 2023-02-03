import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = () =>
  axios.get(baseUrl).then(res => res.data)

export const postAnecdote = async (AnecdoteObj) => {
  const res = await axios.post(baseUrl, AnecdoteObj)
  if (res.status === 201) {
    return res.data
  }
  throw new Error('Error encountered while posting')
}

export const updateAnecdote = async updatedObj => {
  const res = await axios.put(`${baseUrl}/${updatedObj.id}`, updatedObj)
  return res.data
}
  
