import React from 'react'
import { useState } from 'react'
import logo from '../images/logo.png'

// I wanted to add a navbar with a brief explanation of the instructions. Whilst I don't want to teach anyone
// to suck eggs - I felt it important to show a user how I had gone about the choice to type words. 
// It is responsive for mobile but otherwise it only serves to display the instructions modal and the EduMe logo. 


export default function Navbar() {

  const [mobNav, updateMobNav] = useState(false)
  const [display, updateDisplay] = useState(false)

  // Function to toggle the modal display, simply switching between boolean states, which then displays the JSX from line 48. 
  function toggleModal() {
    updateDisplay(!display)
  }

  return <nav className="navbar is-fixed-top" role="navigation" aria-label="main navigation" id="nav-background">
    <div className="navbar-brand">
      <a className="navbar-item" href="/">
        <img src={logo} height="28"></img>
      </a>

      <a onClick={() => updateMobNav(!mobNav)} role="button" className={`navbar-burger ${mobNav ? 'is-active' : ''}`} >
        <span aria-hidden="true" />
        <span aria-hidden="true" />
        <span aria-hidden="true" />
      </a>
    </div>
    <div id="navbarBasicExample" className={`navbar-menu ${mobNav ? 'is-active' : ''}`}>
      <div className="navbar-start">
        <div className="navbar-item has-dropdown is-hoverable">
          <div className="navbar-dropdown">
            <hr className="navbar-divider" />
          </div>
        </div>
      </div>
      <div className="navbar-end ">
        <div className={`navbar-item ${mobNav ? 'is-flex is-flex-direction-row' : ''}`}>
          <div className="navbar-item">
            <button className="button" onClick={toggleModal}>Instructions</button>
          </div>
        </div>
      </div>
    </div>
    {display && <div className={display ? 'modal is-active' : 'modal'}>
      <div className="modal-background"></div>
      <div className="modal-content">
        <div className="box">
          <p>Hello, and thank you for considering my application!</p>
          <br /><br />
          <p>This app is simple enough - it works like an old school telephone. You type in numbers which represent different letters.</p>
          <br /><br />
          <p>By pressing space - you send the numbers through to the backend. This then turns them into letters and suggests a likely word - which it returns</p>
          <br /><br />
          <p>If the combination of numbers doesn't match any words, nothing is typed and you can start a new word instead. If the predictor can't find your word, I'm afraid you have to type it one letter at a time. Sorry!</p>
          <br /><br />
          <p>Feel free to add punctuation and additional spaces! Spaces are automatically added after punctuation.</p>
          <br /><br />
          <p>Many thanks</p>
          <br /><br />
          <p>Joseph</p>
        </div>
      </div>
      <button className="modal-close is-large" aria-label="close" onClick={toggleModal}></button>
    </div>
    }
  </nav >
}