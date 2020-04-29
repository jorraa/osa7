import React from 'react'
//import ReactDOM from 'react-dom'


import {
  Switch,
  Route,
  Link,
//  Redirect,
  useRouteMatch,
//  useHistory,
} from "react-router-dom"

import AnecdoteList from './AnecdoteList'
import Anecdote from './Anecdote'
import CreateNew from './CreateNew'
import About from './About'

const Menu = ({ anecdotes, addNew }) => {
  const padding = {
    paddingRight: 5
  }
  const match = useRouteMatch('/anecdotes/:id')
  console.log('match', match)
  const anecdote = match ? anecdotes.find(a => {
    console.log('a.id', a.id)      
    console.log('params.id', match.params.id)
        return Number(a.id) === Number(match.params.id)
      })
      : null

      
  return (
    <div>
      <div>
        <Link style={padding} to='/'>anecdotes</Link>
        <Link style={padding} to='/create'>create new</Link>
        <Link style={padding} to='/about'>about</Link>
      </div>

      <Switch>
      <Route path="/anecdotes/:id">
          <Anecdote anecdote={ anecdote } />
        </Route>
      <Route path="/create">
        <CreateNew addNew={ addNew }/>
      </Route>
      <Route path="/about">
        <About/>
      </Route>
      <Route path="/">
        <AnecdoteList anecdotes={ anecdotes } />
      </Route>
      </Switch>
    </div>
  )
}

export default Menu