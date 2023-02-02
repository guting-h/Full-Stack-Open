import { useSelector, useDispatch } from 'react-redux'
import { updateVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes)
  const anecdotesToShow = useSelector(state => {
    return anecdotes.filter(a => a !== null && a.content.toLowerCase().includes(state.filter.toLowerCase()))
  })

  const dispatch = useDispatch()

  const handleVote = (anecdote) => {
    dispatch(updateVote(anecdote.id))
    dispatch(setNotification(`you voted ${anecdote.content}`, 5))
  }

  return (
    <div>
        {anecdotesToShow.sort((a, b) => b.votes-a.votes).map(anecdote =>
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

export default AnecdoteList