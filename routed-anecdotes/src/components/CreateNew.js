import React from 'react'
import  { useField } from '../hooks/index'

const CreateNew = (props) => {

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })
  }

  const content = useField('text')
  const author = useField('text')
  const info = useField('text')

  const reset = (event) =>{
    event.preventDefault()
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
          <input {...content} />
        </div>
        <div>
          author
          <input {...author} />
        </div>
        <div>
          url for more info
          <input {...info} />
        </div>
        <button>create</button>
        <button type='button' onClick={reset}>reset</button>
      </form>
      <div>
        {content.value} {author.value} {info.value} 
      </div>
    </div>
  )
}

export default CreateNew