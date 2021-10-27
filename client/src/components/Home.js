import axios from 'axios'
import React from 'react'
import { useState } from 'react'

export default function Home() {
  const [textMessage, updateTextMessage] = useState('')
  const [numbersToConvert, updateNumbersToConvert] = useState('')
  const [options, updateOptions] = useState(false)
  const [optionsArray, updateOptionsArray] = useState([',', '.', '!', '?'])
  const [punctuated, updatePunctuated] = useState(false)

  async function addNumber(event) {
    const newNumbers = numbersToConvert + event.currentTarget.value
    updateNumbersToConvert(newNumbers)
  }

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
        } else {
          updateOptionsArray(data)
          updateOptions(true)
        }
        updateNumbersToConvert('')
        
      } catch (err) {
        console.log(err)
        updateNumbersToConvert('')
      }
    } else {
      const newSentence = textMessage + ' '
      updateTextMessage(newSentence)
    }
    
  }

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

  function punctuate() {
    updateOptions(true)
    updatePunctuated(true)
  }

  function backspace() {
    if (numbersToConvert) {
      const newNumbers = numbersToConvert.slice(0, -1)
      updateNumbersToConvert(newNumbers)
    } else {
      const newSentence = textMessage.slice(0, -1)
      updateTextMessage(newSentence)
    }
    
  }

  return <section className="hero">
    <div className="hero-body">
      <div className="phone">
        <div id="keypad" className="has-text-centered">
          {options && <select id="wordChooser" className="select" onChange={pickWord}>
            <option>Pick a word:</option>
            {optionsArray.map((word, index) => {
              return <option key={index}>{word}</option>
            })}
          </select>}
          <p className="box" id="textMessage">{textMessage}</p>
          <input
            readOnly
            type="text"
            placeholder="Start typing..."
            className="input"
            value={numbersToConvert}
          />
          <div className="columns m-0 box p-0 mt-5">
            <div className="column has-text-centered p-2">
              <button disabled={options} className="button is-fullwidth mb-1" value={[',', '.', '!', '?']} onClick={punctuate}>1<small>&nbsp;,.!?</small></button>
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