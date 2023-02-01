import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes)
  const anecdotesToShow = useSelector(state => {
    return anecdotes.filter(a => a !== null && a.content.toLowerCase().includes(state.filter.toLowerCase()))
  })

  const dispatch = useDispatch()

  return (
    <div>
        {anecdotesToShow.sort((a, b) => b.votes-a.votes).map(anecdote =>
          <div key={anecdote.id}>
          <div>
            {anecdote.content}
              </div>
                <div>
                  has {anecdote.votes}
                  <button onClick={() => dispatch(vote(anecdote.id))}>vote</button>
                </div>
          </div>
        )}
    </div>
  )
}

export default AnecdoteList