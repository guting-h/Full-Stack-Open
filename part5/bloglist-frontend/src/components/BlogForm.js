import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
    const [newTitle, setNewTitle] = useState('') 
    const [newAuthor, setNewAuthor] = useState('')
    const [newURL, setNewURL] = useState('')

    const addBlog = (event) => {
        event.preventDefault()
        const blogObj = {
          title: newTitle,
          author: newAuthor,
          url: newURL,
        }
        createBlog(blogObj)

        setNewTitle('')
        setNewAuthor('')
        setNewURL('')
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={addBlog}>
            title:<input
                value={newTitle}
                onChange={(event) => setNewTitle(event.target.value)}
            /> <br />
            author:<input
                value={newAuthor}
                onChange={(event) => setNewAuthor(event.target.value)}
            /> <br />
            url:<input
                value={newURL}
                onChange={(event) => setNewURL(event.target.value)}
            /> <br />
            <button type="submit">post blog</button>
            </form>
        </div>
    )
}

export default BlogForm