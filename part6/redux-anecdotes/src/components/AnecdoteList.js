import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { setMsg, removeMsg } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes)
  const anecdotesToShow = useSelector(state => {
    return anecdotes.filter(a => a !== null && a.content.toLowerCase().includes(state.filter.toLowerCase()))
  })

  const dispatch = useDispatch()

  const handleVote = (anecdote) => {
    dispatch(vote(anecdote.id))
    dispatch(setMsg(`you voted ${anecdote.content}`))
    setTimeout(() => {
      dispatch(removeMsg())
    }, 5000)
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