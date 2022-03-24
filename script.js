// varibles
const scoreEl = document.getElementById('score')
const highScoreEl = document.getElementById('high-score')
const titleEl = document.getElementById('title')
const inputType = document.getElementById('input-type')
const timeEl = document.getElementById('time')
const levelEl = document.getElementById('level')


// events
inputType.addEventListener('input', checkWord)
levelEl.addEventListener('change', changeLevel)


// for js
let word 

const api = 'https://random-words-api.vercel.app/word'

function randomNewWord() {
    fetch(api).then((data) => {
        return data.json()
    })
    .then(getWords)

    function getWords(data) { 
        let newWord = data[0].word.toLowerCase()
        word = newWord
        titleEl.textContent = word
    }
} 

randomNewWord()

let score = 0 

let highScore = 0

let timer = 10

let level = localStorage.getItem('level') ? localStorage.getItem('level') : 'easy'



// checkWord
function checkWord() {
    if (word == inputType.value) {
        randomNewWord()
        inputType.value = ''
        score++
        scoreEl.textContent = score
        // timer 
        if (level == 'easy') {
            timer += 5
        } else if (level == 'medium') {
            timer += 3
        } else {
            timer += 2
        } 
    }
}


// changeLevel
function changeLevel() {
    level = levelEl.value
    localStorage.setItem('level', levelEl.value)
}

const counter = setInterval(() => {
    if (timer > 0) {
        timer--
        timeEl.textContent = timer
    }
    // highScore
    if (timer == 0) {
        if (score > highScore) {
            highScore = score
            highScoreEl.textContent = highScore
            clearInterval(counter)
        }
    }
},1000)

