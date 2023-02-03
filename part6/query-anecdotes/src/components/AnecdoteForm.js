import { useMutation, useQueryClient } from 'react-query'
import { postAnecdote } from '../requests'
import { useNotificationDispatch } from './NotificationContext'

const AnecdoteForm = () => {
  const queryClient =  useQueryClient() 
  const dispatch = useNotificationDispatch()

  const newAnecdoteMutate = useMutation(postAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    },
    onError: () => {
      const message = 'too short anecdote, must have length 5 characters or more.'
      dispatch({type: 'ERROR', payload: message})
      setTimeout(() => { // not very elegant but works so will be left as it is for now
        dispatch({type: 'CLEAR'})
      }, 5000)
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutate.mutate({ content, votes: 0 })
    dispatch({type: 'NEW ANECDOTE', payload: content})
    setTimeout(() => {
      dispatch({type: 'CLEAR'})
    }, 5000)
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
