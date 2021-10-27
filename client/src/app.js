import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Home from './components/Home'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import './styles/style.scss'

// This is the front end app. I wrote in a switch just so that it's there. We could in theory then add components to the page, such as different phone interfaces etc.

const App = () => (
  <BrowserRouter>
    <Navbar />
    <Switch>
      <Route exact path="/" component={Home} />
    </Switch>
    <Footer />
  </BrowserRouter>
)

export default App