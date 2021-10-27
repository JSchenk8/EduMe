import { letters } from './db/letters.js'
import wordlist from 'wordlist-english'



function getWords(string) {
  const englishWords = wordlist['english/10']
  const englishWordsArray = Object.values(englishWords)
  const potentialLetters = string.split('').map(letter => letters[letter])
  const allLetterCombinations = potentialLetters.reduce((lastArrayOfLetters, currentArray) => {
    console.log('lastArrayOfLetters', lastArrayOfLetters)
    console.log('current Array', currentArray)
    const combinationArray = []
    lastArrayOfLetters.reduce((_, currentLetter) => {
      [...currentArray].map(letter => combinationArray.push(`${currentLetter}${letter}`))
    }, '')
    return combinationArray
  })
  
  const realWords = allLetterCombinations.filter(word => englishWordsArray.includes(word))
  return realWords
}

getWords('43556')