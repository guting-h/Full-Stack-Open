import { useField } from '../hooks'

const CreateNew = (props) => {
    const content = useField('text')
    const author = useField('text')
    const info = useField('text')
  
    const handleSubmit = (e) => {
      e.preventDefault()
      props.addNew({
        content: content.inputs.value,
        author: author.inputs.value,
        info: info.inputs.value,
        votes: 0
      })
    }

    const resetAll = (e) => {
      content.reset()
      author.reset()
      info.reset()
    }
  
    return (
      <div>
        <h2>create a new anecdote</h2>
        <form onSubmit={handleSubmit}>
          <div>
            content
            <input {...content.inputs} />
          </div>
          <div>
            author
            <input {...author.inputs} />
          </div>
          <div>
            url for more info
            <input {...info.inputs} />
          </div>
          <button type='submit'>create</button>
          <button type='button' onClick={resetAll}>reset</button>
        </form>
      </div>
    )
  
}

export default CreateNew