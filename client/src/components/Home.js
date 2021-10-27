import axios from 'axios'
import React from 'react'
import { useState } from 'react'

// This is the main component - all the logic is done here and the request sent to the API. 

// I have explained a bit in comments, but also written a slightly more extensive ReadMe so as to not clutter up the code here too much with comments

export default function Home() {
  // TextMessag - the message displayed after computation
  const [textMessage, updateTextMessage] = useState('')
  // The numbers added by the user
  const [numbersToConvert, updateNumbersToConvert] = useState('')
  // A boolean variable to control visibility of the options drop down for multiple words/punctuation
  const [options, updateOptions] = useState(false)
  // The array holding multiple word options. It defaults as punctuation so that, when no other numbers are pressed, it automatically fills the options with punctuation
  const [optionsArray, updateOptionsArray] = useState([',', '.', '!', '?'])
  // Boolean variable to let the program know where to put in spaces
  const [punctuated, updatePunctuated] = useState(false)
  // Boolean variable to disable the punctuation button once a user has started adding numbers. 
  const [inProgress, updateInProgress] = useState(false)


  // Function to add a number from the keypad to the typing display. 
  async function addNumber(event) {
    const newNumbers = numbersToConvert + event.currentTarget.value
    updateNumbersToConvert(newNumbers)
    updateInProgress(true)
  }


  // Function to request words from the numbers. It runs a post request with the numbers, then updates the appropriate pieces of state.
  async function findWords() {
    if (numbersToConvert) {
      const dataToSend = {
        number: numbersToConvert
      }
      try {
        const { data } = await axios.post('/api/text', dataToSend)
        if (data.length === 1) {
          const newSentence = textMessage + ' ' + data
          updateTextMessage(newSentence)
        } else if (data.length > 0) {
          updateOptionsArray(data)
          updateOptions(true)
        }
        updateNumbersToConvert('')
        updateInProgress(false)
      } catch (err) {
        console.log(err)
        updateNumbersToConvert('')
      }
    } else {
      const newSentence = textMessage + ' '
      updateTextMessage(newSentence)
    }
    
  }

  // Function to input the user choice from the options drop down to the created text message.
  function pickWord(event) {
    if (punctuated) {
      const newSentence = textMessage + event.target.value + ' '
      updateTextMessage(newSentence)
    } else {
      const newSentence = textMessage + ' ' + event.target.value
      updateTextMessage(newSentence)
    }
    updateOptions(false)
    updatePunctuated(false)
    updateNumbersToConvert('')
    updateOptionsArray([',', '.', '!', '?'])
  }

  // Function to show punctuation choices.
  function punctuate() {
    updateOptions(true)
    updatePunctuated(true)
  }

  // Backspace function to remove numbers. If no numbers have been entered, it removes one character at a time from the finished text message.
  function backspace() {
    if (numbersToConvert && numbersToConvert.length > 1) {
      const newNumbers = numbersToConvert.slice(0, -1)
      updateNumbersToConvert(newNumbers)
    } else  if (numbersToConvert.length === 1) {
      updateNumbersToConvert('')
      updateInProgress(false)
    } else {
      const newSentence = textMessage.slice(0, -1)
      updateTextMessage(newSentence)
      updateInProgress(false)
    }
    
  }

  // I haven't commented inside the JSX as it should be fairly obvious. All the classnames are mostly Bulma styling, or specific classes
  // which I have added, which you'll find in the SCSS file. Options are mapped depending on the number returned by the API, or for punctuation. 
  return <section className="hero">
    <div className="hero-body">
      <div className="phone">
        <div id="keypad" className="has-text-centered">
          {options && <div className="select"><select className="select" onChange={pickWord}>
            <option>Pick a word:</option>
            {optionsArray.map((word, index) => {
              return <option key={index}>{word}</option>
            })}
          </select></div>}
          <p className="box" id="textMessage">{textMessage}</p>
          <input
            readOnly
            type="text"
            placeholder="Start typing..."
            className="input"
            value={numbersToConvert}
          />
          <div className="columns m-0 box p-0 mt-5 is-mobile" id="keypadColumns">
            <div className="column has-text-centered p-2">
              <button disabled={options || inProgress} className="button is-fullwidth mb-1" value={[',', '.', '!', '?']} onClick={punctuate}>1<small>&nbsp;,.!?</small></button>
              <button disabled={options} className="button is-fullwidth mb-1" onClick={addNumber} value={'4'}>4<small>&nbsp;ghi</small></button>
              <button disabled={options} className="button is-fullwidth mb-1" onClick={addNumber} value={'7'}>7<small>&nbsp;pqrs</small></button>
              <button disabled className="button is-fullwidth"></button>
            </div>
            <div className="column has-text-centered p-2">
              <button disabled={options} className="button is-fullwidth mb-1" onClick={addNumber} value={'2'}>2<small>&nbsp;abc</small></button>
              <button disabled={options} className="button is-fullwidth mb-1" onClick={addNumber} value={'5'}>5<small>&nbsp;jkl</small></button>
              <button disabled={options} className="button is-fullwidth mb-1" onClick={addNumber} value={'8'}>8<small>&nbsp;tuv</small></button>
              <button disabled={options}className="button is-fullwidth mb-1" onClick={findWords}>_</button>
            </div>
            <div className="column has-text-centered p-2">
              <button disabled={options} className="button is-fullwidth mb-1" onClick={addNumber} value={'3'}>3<small>&nbsp;def</small></button>
              <button disabled={options} className="button is-fullwidth mb-1" onClick={addNumber} value={'6'}>6<small>&nbsp;mno</small></button>
              <button disabled={options} className="button is-fullwidth mb-1" onClick={addNumber} value={'9'}>9<small>&nbsp;wxyz</small></button>
              <button disabled={options} className="button is-fullwidth" onClick={backspace}>{'<'}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
}