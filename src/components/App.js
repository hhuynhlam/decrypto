import React from 'react'
import { BrowserRouter, Route, Switch } from "react-router-dom"
import CreatePage from './CreatePage'
import JoinPage from './JoinPage'
import LandingPage from './LandingPage'
import NotFound from './NotFound'

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <LandingPage />
        </Route>
        <Route exact path="/create">
          <CreatePage />
        </Route>
        <Route path="/join/:roomId?">
          <JoinPage />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

export default App
