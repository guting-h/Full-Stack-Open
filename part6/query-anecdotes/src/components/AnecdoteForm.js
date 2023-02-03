import { useMutation, useQueryClient } from 'react-query'
import { postAnecdote } from '../requests'

const AnecdoteForm = () => {
  const queryClient =  useQueryClient() 

  // works but may be laggy to show changes on the browser
  const newAnecdoteMutate = useMutation(postAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    },
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutate.mutate({ content, votes: 0 })
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
