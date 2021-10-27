import { letters } from '../db/letters.js'
import wordlist from 'wordlist-english'



// ! This is the function to convert numbers to letters. It is run through the route /api/text


export default async function typeWord(req, res, next) {
  const data = req.body['number']
  if (!data) {
    return res.status(400).send({ message: 'No character provided' })
  }
  try {
    if (data.length === 1) {
      return res.status(201).send(letters[data])
    } else {
      // Get an array of words from WordList
      const englishWords = wordlist['english/10']
      const englishWordsArray = Object.values(englishWords)

      // Get an array of potential letters:
      const potentialLetters = data.split('').map(letter => letters[letter])

      // Use a double reduce function to combine letters into an array of combinations:
      // ? I have described this properly in the ReadMe.

      const allLetterCombinations = potentialLetters.reduce((lastArrayOfLetters, currentArray) => {
        const combinationArray = []
        lastArrayOfLetters.reduce((_, currentLetter) => {
          [...currentArray].map(letter => combinationArray.push(`${currentLetter}${letter}`))
        }, '')
        return combinationArray
      })

      // This checks against the npm package of 'real words' to see if any words typed match. It then returns the 
      // real words and also the original array. On the front end, first the real words are disaplayed
      const realWords = allLetterCombinations.filter(word => englishWordsArray.includes(word))
      return res.status(201).send(realWords)
    }
  } catch (err) {
    next(err)
  }
}


