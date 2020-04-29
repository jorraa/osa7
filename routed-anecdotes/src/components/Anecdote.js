import React from 'react'

const Anecdote = ({ anecdote }) => {
  
  return anecdote
    ?<div> 
      <div>{anecdote.content} by {anecdote.author} </div>
      <div>has {anecdote.votes} votes</div>
      <div>for more info see <a href={anecdote.info}>{anecdote.info}</a></div>
    </div>
    :<div> No anecdote found</div>
  }
export default Anecdote