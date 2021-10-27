import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Home from './components/Home'
import './styles/style.scss'

// ! This is our front end app. I wrote in a switch just so that it's there. We could in theory then add components to the page, such as different phone interfaces etc.

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home} />
    </Switch>
  </BrowserRouter>
)

export default App