import { letters } from '../db/letters.js'
import wordlist from 'wordlist-english'






export default async function typeWord(req, res, next) {
  const data = req.body
  if (!data || !data.length) {
    return res.status(400).send({ message: 'No character provided' })
  }
  try {
    if (data.length === 1) {
      return res.status(201).send(letters[data])
    } else {
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
      // real words and also the original array. On the front end, first the real words are disaplayed, but the user has the choice to see the combinations as well
      const realWords = allLetterCombinations.filter(word => wordlist.includes(word))
      return res.status(201).send(realWords, allLetterCombinations)
    }
  } catch (err) {
    next(err)
  }
}

