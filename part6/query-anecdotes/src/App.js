import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useQueryClient, useMutation } from 'react-query'
import { getAnecdotes, updateAnecdote } from './requests'
import { useNotificationDispatch } from './components/NotificationContext'

const App = () => {
  const queryClient = useQueryClient() 
  const dispatch = useNotificationDispatch()

  const updateMutation = useMutation(updateAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    },
  })

  const handleVote = (anecdote) => {
    updateMutation.mutate({...anecdote, votes: anecdote.votes + 1 })
    dispatch({type: 'VOTE', payload: anecdote.content})
    setTimeout(() => {
      dispatch({type: 'CLEAR'})
    }, 5000)
  }

  const anecdotes = useQuery(
    'anecdotes', getAnecdotes, 
    { retry: 1 }
  )

  if (anecdotes.isLoading) {
    return (
      <div> 
        Loading data...
      </div>
    )
  } else if (anecdotes.isError) {
    return (
      <div> 
        anecdote service not available due to problems in server
      </div>
    )
  }

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.data.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
