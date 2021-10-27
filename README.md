# EduMe Tech Test

EduMe full stack tech test, completed by Joseph Schenk 27/10/21. 

Thank you for considering my application for full stack developer at EduMe. 

Included here is my project. 

The brief stated to build a phone like UI which ran on the T9 texting pattern. I.e. 2 for abc, 3 for def etc etc. 
I was asked to build it using Node.js and React/Redux. 

I used Node and Webpack along with React on the front end and the styling framework Bulma. 

## To Run the App

To run the app, open the folder in your terminal and at the root of the project run the following commands:

npm i
npm run start

This will start the server, which will run on localhost:8000. Then, in another terminal window, navigate to the client folder and run the following commands:

npm i
npm run serve

This will open the front end on your chosen browser at localhost:8001. 

## Instructions

I have written an instruction modal, but to clarify:

- Type numbers using the keypad, they will appear in the disabled input above the keypad
- When you are ready to get a word from the backend, press the spacebar
- The backend will predict a common english word which matches with the combination of letters created from your chosen numbers
- If more than one word matches, they will be provided and you can pick from a dropdown menu
- If no word matches, nothing happens. Please start typing again. If the API cannot guess your word, I'm afraid you have to type it one letter at a time
- If you which to add spaces, simply press the space bar when no numbers are selected
- To add punctuation, press 1 and choose the punctuation from the drop down. Spaces are automatically added after punctuation
- The backspace will remove numbers you have selected, or if you have not typed any numbers, it will remove one character at a time from the selected text. 

## The Back End

The back end hinges on the ability to turn numbers into all the possible combinations of letters. 

I used a reduce function inside a reduce function, this will therefore take each array and add on the next combination, in the correct order. The code looks as such: 

```
    const allLetterCombinations = potentialLetters.reduce((lastArrayOfLetters, currentArray) => {
            const combinationArray = []
            lastArrayOfLetters.reduce((_, currentLetter) => {
              [...currentArray].map(letter => combinationArray.push(`${currentLetter}${letter}`))
            }, '')
            return combinationArray
          })
```

The top filter takes all the arrays of letters, so it is an array of arrays. 

For example, we pass in the numbers 2 and 3. 

It takes an array [‘a’, ‘b’, ‘c’] first, and the next array [‘d’, ‘e’, ‘f’]

It then takes the first array ([‘a’, ‘b’, ‘c’]) and adds each of these letters to each of the letters of the next array which is spread (I have called it ‘current array’). This creates a new Array: [‘ad’, ‘ae’, ‘af’, ‘bd’, ‘be’, ‘bf’, ‘cd’, ‘ce’, ‘cf’] which is returns as the initial value to the first reduce (called ‘last array of letters'). 

Hence, when it is run again, it is now taking the new array. In our example above, it would simply end, but if there were a third number, it would do the same by adding the letters of the third number onto the new array ([‘ad’, ‘ae’, ‘af’, ‘bd’, ‘be’, ‘bf’, ‘cd’, ‘ce’, ‘cf’])

## The Front End

The front end is fairly self explanatory.

I used React State to control the disabling of buttons and the display of the choice drop down. 

Hopefully this gives it a nice clean look and easy to use feel - by not allowing users to press punctuation after numbers they cannot upset the back end and it therefore requires less error handling. 

I did my best to make it responsive, but have not tested it on Mobile. I would recommend viewing it on a laptop or desktop, but hope that the responsiveness will smooth out differences in screen sizes for potential users. 

## Limitations

In order to reduce the computation time, I used an array of common words from the npm package wordlist. This package gives the choice of different dictionaries, and I chose the 'common english' words for my predictor. 

However, this means that not all letter combinations will provide words (for example, 'pot' or 'lit'). This is an obvious limitation, but only 3904 words exist in this library. 

The workaround for the user is of course to type the letters one letter at a time. 

Another limitation is that it is not designed mobile first. For a deployable app I would now go back and write mobile styling and functionality.

There is no way of adding capital letters to the text. I thought about having a selector which sends to the back end, but at this stage I had spent quite some time on the tech test, and felt it best to leave it as a future feature. 

## Future Features

Without wanting to repeat myself, I would want to make it mobile first and add in capital letters. Furthermore, I would like to add additional dictionaries to improve the reliability of the predictive texter. 

## Test Driven Development

I try and code with a test first mentality, however, I decided early on that I wanted to use a predictive text mechanism and could not think of a way to accurately test this for all options. 

Whilst I should then have written basic tests, I decided instead to user test this app, knowing that there was only so much functionality that would require testing. 

In future, I would spend considerably more time thinking about tests, and planning how to develop my app from a test-first perspective. 
