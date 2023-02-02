import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const postAnecdote = async (content) => {
  const anecdoteObj = { content, votes: 0 }
  const response = await axios.post(baseUrl, anecdoteObj)
  return response.data
}

const update = async (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject)
}

export default { getAll, postAnecdote, update }