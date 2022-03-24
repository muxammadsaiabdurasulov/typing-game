const scoreEl = document.getElementById('score')
const titleEl = document.getElementById('title')
const timeEl = document.getElementById('time')
const highScoreEl = document.getElementById('hig-score')
const inpuType = document.getElementById('inpu-type')
const levelEl = document.getElementById('level')


inpuType.addEventListener('input', checkWord)
levelEl.addEventListener('change', changeLevel)

let word

let score = 0

let timer = 10

let highScore = 0 

let level = localStorage.getItem('level') ? localStorage.getItem('level') : 'easy'


const api = 'https://random-words-api.vercel.app/word'

function randomNewWord() {
    fetch(api).then((data) => {
        return data.json()
    })
    .then(getWords)

    function getWords() {
        let newWord = data[0].word.toLowerCase()
        word = newWord
        titleEl.textContent = word 
    }
}

randomNewWord()

function checkWord() {
    if (word == inputType.value) {
        randomNewWord() 
        inputType.value = ''
        score++
        scoreEl.textContent = score

        if (level == 'easy') {
            timer += 5 
        } else if (level == 'medium') { 
            timer += 3
        } else {
            timer += 2
        }
    }

}

function changeLevel() {
    level = levelEl.value
    localStorage.setItem('level', levelEl.value)
}

const counter = setInterval(() => {
    if (timer > 0) {
        timer-- 
        timeEl.textContent = timer 
    }

    if (timer == 0) {
        if (score > highScore) {
            highScore = score
            highScoreEl.textContent = highScore
            clearInterval(counter)
        }
    }
}, 1000)